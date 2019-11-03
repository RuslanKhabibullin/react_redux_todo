import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signIn } from '../../actions/userActions'
import { Redirect } from 'react-router-dom'
import { emailValidations, passwordValidations } from '../../validations'
import { isUndefined, inputInvalidate } from "../../helpers"

class Login extends Component {
  static propTypes = {
    signedIn: PropTypes.bool.isRequired,
    signIn: PropTypes.func.isRequired,
  }

  static formErrorConfig = {
    email: emailValidations,
    password: passwordValidations
  }

  state = {
    email: '',
    password: '',
    formErrors: {}
  }

    // Input handlers
    onInputChange = (attributeName) => (ev) => {
      ev.preventDefault()
      const value = ev.target.value
      const { formErrors } = this.state
  
      this.setState({
        [attributeName]: value,
        formErrors: { ...formErrors, ...inputInvalidate(attributeName, value, Login.formErrorConfig) }
      })
    }
  
    formValid = () => {
      const { formErrors } = this.state
      const invalidAttrubte = Object.entries(formErrors).find(([_name, errors]) => errors.length > 0)
      return isUndefined(invalidAttrubte)
    }
  
    currentInputErrors = (attributeName) => {
      const { formErrors } = this.state
      if (!formErrors[attributeName] || formErrors[attributeName].length === 0) return null
  
      return <span className="note__error-message">{formErrors[attributeName][0]}</span>
    }

  handleSubmit = ev => {
    ev.preventDefault()
    const { email, password } = this.state
    if (this.formValid()) this.props.signIn(email, password)
  }

  render() {
    const { email, password } = this.state
    if (this.props.signedIn) return <Redirect to="/" />
    return (
      <div>
        <div className="center login_form">
          <h1>Email</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="input_block">
              <input
                type="text"
                name="email"
                value={email}
                onChange={this.onInputChange("email")}
                placeholder="Email"
              />
              { this.currentInputErrors("email") }
            </div>
            <div className="input_block">
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.onInputChange("password")}
                placeholder="Password"
              />
              { this.currentInputErrors("password") }
            </div>
            <input type="submit" className="input_button" />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => {
  return { signedIn: user.authentication.loaded }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: (email, password) => dispatch(signIn({ email, password })),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
