import React from "react"
import propTypes from "prop-types"
import "./DashboardNoteItem.css"

function dashboardNoteItemClickHandle(props) {
  return (ev) => {
    ev.preventDefault()
    const { toggleOpen, id } = props
    toggleOpen(id)
  }
}

function DashboardNoteItem(props) {
  const activeClass = props.isActive ? "notes__item--active" : ""
  const crossedClass = props.isFinished ? "notes__item--crossed" : ""
  return (
    <li className={`notes__item ${activeClass} ${crossedClass}`}>
      <button onClick={dashboardNoteItemClickHandle(props)}>{props.title}</button>
    </li>
  )
}

DashboardNoteItem.propTypes = {
  id: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  toggleOpen: propTypes.func.isRequired,
  isActive: propTypes.bool.isRequired
}

export default DashboardNoteItem;
