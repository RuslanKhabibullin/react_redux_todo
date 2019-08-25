import React, { Component } from "react"
import propTypes from "prop-types"
import "./DashboardNoteItem.css"

class DashboardNoteItem extends Component {
  static propTypes = {
    id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    toggleOpen: propTypes.func.isRequired
  }

  clickHandle = (ev) => {
    ev.preventDefault()
    const { toggleOpen, id } = this.props
    toggleOpen(id)
  }

  render() {
    return (
      <li className="notes__item">
        <button onClick={this.clickHandle}>{this.props.title}</button>
      </li>
    )
  }
}

export default DashboardNoteItem;
