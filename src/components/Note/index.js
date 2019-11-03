import React, { Component } from "react"
import propTypes from "prop-types"
import "./Note.css"
import { connect } from "react-redux"
import { isUndefined, inputInvalidate } from "../../helpers"
import { updateNote } from "../../actions/noteActions"
import { titleValidations } from '../../validations'

class Note extends Component {
  static propTypes = {
    note: propTypes.shape({
      id: propTypes.string,
      title: propTypes.string,
      description: propTypes.string,
      finished: propTypes.bool
    }),
    closeNote: propTypes.func.isRequired,
    updateNote: propTypes.func.isRequired,
    openedNoteId: propTypes.string,
  }

  static formErrorConfig = {
    title: titleValidations,
    description: []
  }

  state = {
    title: undefined,
    description: undefined,
    formErrors: {}
  }

  constructor(props) {
    super(props)
    this.baseState = this.state
  }

  static getDerivedStateFromProps({ note }, { title }){
    if (note && note.title && isUndefined(title)){
      return {
        title: note.title,
        description: note.description,
        finished: note.finished
      }
    } else {
      return null
    }
  }

  // Reset state on note switch
  componentDidUpdate(prevProps) {
    if (!prevProps.note || !this.props.note) return

    const prevId = prevProps.note.id
    const { id } = this.props.note

    if (prevId !== id) {
      return this.setState(this.baseState)
    }
  }

  // Close current note
  closeClickHandler = (ev) => {
    ev.preventDefault()
    this.setState(this.baseState)
    this.props.closeNote()
  }

  saveClickHandler = (ev) => {
    ev.preventDefault()
    const { updateNote, note} = this.props
    const { title, description } = this.state
    const payload = {
      id: note.id, finished: note.finished, title, description
    }
    if (this.formValid()) {
      updateNote(payload)
      this.setState(this.baseState)
      this.props.closeNote()
    }
  }

  stateToggleClickHandler = (ev) => {
    const { note, updateNote } = this.props
    const { title, description } = this.state
    const payload = {
      id: note.id, title, description, finished: ev.target.checked
    }
    if (this.formValid()) updateNote(payload)
  }

  // Textareas handlers
  onInputChange = (attributeName) => (ev) => {
    ev.preventDefault()
    const value = ev.target.value
    const { formErrors } = this.state

    this.setState({
      [attributeName]: value,
      formErrors: { ...formErrors, ...inputInvalidate(attributeName, value, Note.formErrorConfig) }
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

  render() {
    if (!this.props.note) return null
    
    const { finished } = this.props.note
    return (
      <article className="note">
        <div className="note__header">
          <label className="custom-checkbox">
            <input
              type="checkbox"
              name="finished"
              checked={finished}
              onChange={this.stateToggleClickHandler}>
            </input>
            <span className="checkbox-indicator"></span>
          </label>
          <textarea
            value={this.state.title}
            onChange={this.onInputChange("title")}
            className="note__title"
            placeholder="Title" />
          { this.currentInputErrors("title") }
        </div>
        <div className="note__content">
          <textarea
            value={this.state.description}
            onChange={this.onInputChange("description")}
            className="note__description"
            placeholder="Description"
            rows="1" />
          { this.currentInputErrors("description") }
          <div className="note__buttons">
            <button onClick={this.saveClickHandler} className="button">save</button>
            <button onClick={this.closeClickHandler} className="button">close</button>
          </div>
        </div>
      </article>
    )
  }
}

export default connect((state, ownProps) => ({
 note: state.notes.entities.get(ownProps.openedNoteId)
}), { updateNote })(Note);
