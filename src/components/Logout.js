import React from "react"
import PropTypes from "prop-types"
import { Redirect } from "react-router-dom"
import { connect} from "react-redux"
import { signOut } from '../actions/userActions'

function Logout({ signOut }) {
  signOut()
  return <Redirect to="/login" />
}

Logout.propTypes = {
  signOut: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return { signOut: () => dispatch(signOut()) }
}

export default connect(null, mapDispatchToProps)(Logout)
