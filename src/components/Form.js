import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Form extends Component {
  static propTypes = {
    initialValues: PropTypes.object.isRequired,
    validations: PropTypes.object.isRequired,
    children: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    updateStateValuesOnPropsChange: PropTypes.func
  }

  state = {
    values: {},
    errors: {}
  }

  constructor(props) {
    super(props)
    this.state.values = props.initialValues
  }

  static getDerivedStateFromProps(props, state){
    const { updateStateValuesOnPropsChange } = props
    if (updateStateValuesOnPropsChange) {
      return { ...state, ...{ values: updateStateValuesOnPropsChange(props.initialValues, state.values) }}
    } else {
      return state
    }
  }

  inputInvalidate = (inputName, inputValue) => {
    const inputConfig = this.props.validations[inputName]
    if (!inputConfig) return {}
  
    const errorMessages = inputConfig.filter(({ logic }) => !logic(inputValue)).map(element => element.message)
    return { [inputName]: errorMessages }
  }

  formValid = () => {
    const { errors } = this.state
    const invalidAttribute = Object.entries(errors).find(([_name, errors]) => errors.length > 0)
    return invalidAttribute === undefined
  }

  onInputChange = (ev) => {
    const { name, type } = ev.target
    const { errors, values } = this.state

    if (["checkbox", "radio"].includes(type)) {
      const { checked } = ev.target
      this.setState({
        values: { ...values, ...{ [name]: checked } }
      })
    } else {
      const { value } = ev.target
      this.setState({
        values: { ...values, ...{ [name]: value } },
        errors: { ...errors, ...this.inputInvalidate(name, value) }
      })
    }
  }

  resetForm = () => {
    this.setState({ values: this.props.initialValues, errors: {} })
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    const { values } = this.state
    const { onSubmit } = this.props

    if (this.formValid()) onSubmit(values, { resetForm: this.resetForm })
  }

  decoratedErrors = () => {
    const { errors } = this.state
    return Object.entries(errors).reduce((accumulator, [name, errors]) => {
      if (errors && errors.length > 0) {
        return { ...accumulator, ...{ [name]: <span className="error-message">{errors[0]}</span> } }
      } else {
        return { ...accumulator, ...{ [name]: null } }
      }
    }, {})
  }

  render() {
    const { values } = this.state
    return this.props.children({
      onInputChange: this.onInputChange,
      handleSubmit: this.handleSubmit,
      errors: this.decoratedErrors(),
      values
    })
  }
}

export default Form;
