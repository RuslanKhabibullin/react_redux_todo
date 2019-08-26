import React, { Component } from "react"
import Note from "../Note"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import DashboardNoteItem from "../DashboardNoteItem"
import NewDashboardNoteItem from "../NewDashboardNoteItem"
import "./Dashboard.css"
import { mapToArray } from "../../helpers"

class Dashboard extends Component {
  static propTypes = {
    notes: PropTypes.array
  }

  state = {
    openedNoteId: undefined
  }

  openNote = (noteId) => this.setState({ openedNoteId: noteId })
  closeNote = () => this.setState({ openedNoteId: undefined })
  todoList = () => {
    const { openedNoteId } = this.state
    return this.props.todos.map(({ id, title }) => {
      return <DashboardNoteItem
        key={id} id={id} title={title} toggleOpen={this.openNote} isActive={id === openedNoteId}
      />
    })
  }

  render() {
    const { openedNoteId } = this.state

    return (
      <section className="dashboard">
        <div className="notes__wrapper">
          <NewDashboardNoteItem />
          <ul className="notes">{this.todoList()}</ul>
        </div>
        <Note openedNoteId={openedNoteId} closeNote={this.closeNote} />
      </section>
    )
  }
}

export default connect(state => ({
  todos: mapToArray(state.notes.entities)
}))(Dashboard)
