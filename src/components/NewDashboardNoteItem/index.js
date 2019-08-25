import React, { Component } from "react"
import './NewDashboardNoteItem.css'
import { createNote } from '../../actions/noteActions'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { inputInvalidate } from "../../helpers"

class NewDashboardNoteItem extends Component {
  static propTypes = {
    createNote: propTypes.func.isRequired
  }

  static formErrorConfig = {
    title: [{
      message: "Should have more than 3 symbols",
      logic: (value) => value && value.length > 3,
    }]
  }

  state = {
    title: ""
  }

  noteChangeHandler = (ev) => {
    ev.preventDefault()
    const value = ev.target.value
    this.setState({ title: value })
  }

  noteCreationClickHandler = (ev) => {
    ev.preventDefault()
    const { title } = this.state
    if (this.titleValid()) {
      this.props.createNote({ title })
      this.setState({ title: "" })
    }
  }

  titleValid = () => {
    const inputErrors = inputInvalidate('title', this.state.title, NewDashboardNoteItem.formErrorConfig)
    return inputErrors.title.length === 0
  }

  render() {
    const { title } = this.state 
    return (
      <div className="new-note">
        <input
          name="note"
          type="text"
          className="new-note__input"
          placeholder="Add note"
          value={title}
          onChange={this.noteChangeHandler}>
        </input>
        <button className="button new-note__button" onClick={this.noteCreationClickHandler}>Save</button>
      </div>
    )
  }
}

export default connect(null, { createNote })(NewDashboardNoteItem)
