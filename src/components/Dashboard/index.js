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
import { fetchProfile } from "../../actions/userActions"
import { fetchNotes } from "../../actions/noteActions"
import Loader from "../Loader"
import { OrderedMap } from "immutable"

class Dashboard extends Component {
  static propTypes = {
    notes: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      loaded: PropTypes.bool.isRequired,
      entities: PropTypes.instanceOf(OrderedMap).isRequired
    }).isRequired,
    user: PropTypes.shape({
      record: PropTypes.object.isRequired,
      authentication: PropTypes.object.isRequired,
      error: PropTypes.object.isRequired
    }).isRequired
  }

  state = {
    openedNoteId: undefined
  }

  openNote = (noteId) => this.setState({ openedNoteId: noteId })
  closeNote = () => this.setState({ openedNoteId: undefined })
  todoList = (isFinished = false) => {
    const { openedNoteId } = this.state
    const { notes } = this.props
    const todos = mapToArray(notes.get("entities")).filter(({ finished }) => finished === isFinished)
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

  componentDidMount() {
    const { user, fetchProfile, notes, fetchNotes } = this.props
    if (user.authentication.get("loaded") && !user.record.get("loading") && !user.record.get("loaded")) {
      fetchProfile(user.record.get("id"), user.authentication.get("token"))
    }
    if (user.authentication.get("loaded") && !notes.get("loaded") && !notes.get("loading")) {
      fetchNotes(user.authentication.get("token"))
    }
  }

  render() {
    const { openedNoteId } = this.state
    const { user, notes } = this.props

    if (!user.authentication.get("loaded")) return <Redirect to="/login" />
    if (user.record.get("loading") || notes.get("loading")) return <Loader />

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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    notes: state.notes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProfile: (id, token) => dispatch(fetchProfile({ id, token })),
    fetchNotes: (token) => dispatch(fetchNotes({ token }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
