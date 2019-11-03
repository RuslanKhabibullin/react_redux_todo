import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { NavLink } from "react-router-dom" 

function Navigation({ signedIn }) {
  if (signedIn) return <NavLink to="/logout">Выйти</NavLink>
  return null
}

Navigation.propTypes = {
  signedIn: PropTypes.bool.isRequired
}

const mapStateToProps = ({ user }) => {
  return { signedIn: user.authentication.loaded }
}

export default connect(mapStateToProps)(Navigation)
