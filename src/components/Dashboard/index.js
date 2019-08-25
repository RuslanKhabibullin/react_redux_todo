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

  render() {
    const todoList = this.props.todos.map(({ id, title }) => {
      return <DashboardNoteItem
        key={id} id={id} title={title} toggleOpen={this.openNote}
      />
    })

    return (
      <section className="dashboard">
        <div className="notes__wrapper">
          <NewDashboardNoteItem />
          <ul className="notes">{todoList}</ul>
        </div>
        <Note openedNoteId={this.state.openedNoteId} closeNote={this.closeNote} />
      </section>
    )
  }
}

export default connect(state => ({
  todos: mapToArray(state.notes.entities)
}))(Dashboard)
