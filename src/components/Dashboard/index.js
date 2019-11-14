import React, { Component } from "react"
import Note from "../Note"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import DashboardNoteItem from "../DashboardNoteItem"
import NewDashboardNoteItem from "../NewDashboardNoteItem"
import UserSidebar from "../UserSidebar"
import "./Dashboard.css"
import { mapToArray } from "../../helpers"
import { Redirect } from "react-router-dom"

class Dashboard extends Component {
  static propTypes = {
    notes: PropTypes.array,
    signedIn: PropTypes.bool.isRequired
  }

  state = {
    openedNoteId: undefined
  }

  openNote = (noteId) => this.setState({ openedNoteId: noteId })
  closeNote = () => this.setState({ openedNoteId: undefined })
  todoList = (isFinished = false) => {
    const { openedNoteId } = this.state
    const todos = this.props.todos.filter(({ finished }) => finished === isFinished)
    if (todos.length === 0) {
      return <p className="dashboard__text">No todos here :(</p>
    } else {
      return todos.map(({ id, title, finished }) => {
        return <DashboardNoteItem
          key={id}
          id={id}
          title={title}
          isFinished={finished}
          toggleOpen={this.openNote}
          isActive={id === openedNoteId}
        />
      })
    }
  }

  render() {
    const { openedNoteId } = this.state
    const { signedIn } = this.props

    if (!signedIn) return <Redirect to="/login" />

    return (
      <section className="dashboard">
        <UserSidebar />
        <div className="notes__wrapper">
          <NewDashboardNoteItem />
          <h2 className="dashboard__subtitle">active todos</h2>
          <ul className="notes">{this.todoList()}</ul>
          <h2 className="dashboard__subtitle">finished todos</h2>
          <ul className="notes">{this.todoList(true)}</ul>
        </div>
        <Note openedNoteId={openedNoteId} closeNote={this.closeNote} />
      </section>
    )
  }
}

export default connect(state => ({
  signedIn: state.user.authentication.loaded,
  todos: mapToArray(state.notes.entities)
}))(Dashboard)
