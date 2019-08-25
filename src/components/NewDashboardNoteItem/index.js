import React, { Component } from "react"
import './NewDashboardNoteItem.css'
import { createNote } from '../../actions/noteActions'
import { connect } from 'react-redux'
import propTypes from 'prop-types'

class NewDashboardNoteItem extends Component {
  static propTypes = {
    createNote: propTypes.func.isRequired
  }

  state = {
    title: ""
  }

  noteChangeHandler = (ev) => {
    ev.preventDefault()
    this.setState({ title: ev.target.value })
  }

  noteCreationClickHandler = (ev) => {
    ev.preventDefault()
    const { title } = this.state
    this.props.createNote({ title })
    this.setState({ title: "" })
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
