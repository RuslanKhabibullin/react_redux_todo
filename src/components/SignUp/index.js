import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { signUp } from "../../actions/userActions"
import { Redirect, NavLink } from "react-router-dom"
import { emailValidations, passwordValidations } from "../../validations"
import Form from "../Form"
import "./SignUp.css"

const onSubmit = ({ signUp }) => ({ email, password }) => signUp(email, password)

function SignUp(props) {
  if (props.signedIn) return <Redirect to="/" />

  return (
    <section className="registration">
      <Form
        initialValues={ { email: "", password: "" } }
        validations={ { email: emailValidations, password: passwordValidations } }
        onSubmit={onSubmit(props)}
      >
        {({ onInputChange, handleSubmit, errors, values }) => (
          <div className="registration__form">
            <form onSubmit={handleSubmit}>
              <div className="input_block">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={onInputChange}
                />
                { errors.email }
              </div>
              <div className="input_block">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={onInputChange}
                />
                { errors.password }
              </div>
              <input type="submit" className="input_button" value="Sign Up"/>
              <NavLink to="/login" className="registration__link">Login</NavLink>
            </form>
          </div>
        )}
      </Form>
    </section>
  )
}

SignUp.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
}

const mapStateToProps = ({ user }) => {
  return { signedIn: user.authentication.loaded }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: (email, password) => dispatch(signUp({ email, password })),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp)
