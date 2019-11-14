import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { signIn } from "../../actions/userActions"
import { Redirect } from "react-router-dom"
import { emailValidations, passwordValidations } from "../../validations"
import Form from "../Form"
import "./Login.css"

const onSubmit = ({ signIn }) => ({ email, password }) => signIn(email, password)

function Login(props) {
  if (props.signedIn) return <Redirect to="/" />

  return (
    <section className="login">
      <Form
        initialValues={ { email: "", password: "" } }
        validations={ { email: emailValidations, password: passwordValidations } }
        onSubmit={onSubmit(props)}
      >
        {({ onInputChange, handleSubmit, errors, values }) => (
          <div className="login__form">
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
              <input type="submit" className="input_button" value="Sign in"/>
            </form>
          </div>
        )}
      </Form>
    </section>
  )
}

Login.propTypes = {
  signedIn: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
}

const mapStateToProps = ({ user }) => {
  return { signedIn: user.authentication.loaded }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: (email, password) => dispatch(signIn({ email, password })),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
