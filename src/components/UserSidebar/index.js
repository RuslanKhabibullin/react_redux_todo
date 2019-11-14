import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { limitString } from '../../helpers'
import "./UserSidebar.css"
import { ReactComponent as UserIcon } from './user-icon.svg'

function UserSidebar({ email }) {
  return (
    <section className="user-sidebar">
      <div className="user-logo">
        <UserIcon />
      </div>
      <p className="user-email">{ limitString(email, 15) }</p>
      <NavLink to="/logout" className="user-logout">Sign out</NavLink>
    </section>
  )
}

UserSidebar.propTypes = {
  email: PropTypes.string.isRequired
}

const mapStateToProps = ({ user }) => {
  return { email: user.record.email }
}

export default connect(mapStateToProps)(UserSidebar)
