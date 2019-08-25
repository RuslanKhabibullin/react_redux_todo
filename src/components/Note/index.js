import React, { Component, Fragment } from "react"
import propTypes from "prop-types"
import "./Note.css"
import { connect } from "react-redux"
import { isUndefined, inputInvalidate } from "../../helpers"
import { updateNote } from "../../actions/noteActions"
import Title from './Title'
import Description from './Description'
import StateButton from './StateButton'

class Note extends Component {
  static propTypes = {
    note: propTypes.shape({
      id: propTypes.string,
      title: propTypes.string,
      description: propTypes.string,
      state: propTypes.oneOf(["new", "finished"])
    }),
    closeNote: propTypes.func.isRequired,
    updateNote: propTypes.func.isRequired,
    openedNoteId: propTypes.string,
  }

  static formErrorConfig = {
    title: [{
      message: "Should have more than 3 symbols",
      logic: (value) => value && value.length > 3,
    }]
  }

  state = {
    editView: false,
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
        description: note.description
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
      id: note.id, state: note.state, title, description
    }
    if (this.formValid()) updateNote(payload)
  }

  stateToggleClickHandler = (ev) => {
    ev.preventDefault()
    const { note, updateNote } = this.props
    const { title, description } = this.state
    const payload = {
      id: note.id, title, description, state: note.state === "new" ? "finished" : "new"
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

  // Show text tags or textareas by editable flag
  noteContentByFlag = () => {
    const { state } = this.props.note

    return (
      <Fragment>
        <Title
          title={this.state.title}
          changeTitleHandler={this.onInputChange("title")}
          currentInputErrors={this.currentInputErrors("title")} />
        <Description
          description={this.state.description}
          changeDescriptionHandler={this.onInputChange("description")}
          currentInputErrors={this.currentInputErrors("description")} />
        <div className="note__state"><b>State:</b>{state || "new"}</div>
        <div className="note__buttons">
          <button onClick={this.saveClickHandler} className="button">save</button>
          <StateButton clickHandler={this.stateToggleClickHandler} state={state} />
          <button onClick={this.closeClickHandler} className="button">close</button>
        </div>
      </Fragment>
    )
  }

  render() {
    if (!this.props.note) return null
    return <article className="note">{this.noteContentByFlag()}</article>
  }
}

export default connect((state, ownProps) => ({
 note: state.notes.entities.get(ownProps.openedNoteId)
}), { updateNote })(Note);
