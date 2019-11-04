import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { signIn } from '../actions/userActions'
import { Redirect } from 'react-router-dom'
import { emailValidations, passwordValidations } from '../validations'
import Form from './Form'

const onSubmit = ({ signIn }) => ({ email, password }) => signIn(email, password)

function Login(props) {
  if (props.signedIn) return <Redirect to="/" />

  return (
    <Form
      initialValues={ { email: "", password: "" } }
      validations={ { email: emailValidations, password: passwordValidations } }
      onSubmit={onSubmit(props)}
    >
      {({ onInputChange, handleSubmit, errors, values }) => (
        <div className="center login_form">
          <form onSubmit={handleSubmit}>
            <div className="input_block">
              <input
                type="text"
                name="email"
                value={values.email}
                onChange={onInputChange}
                placeholder="Email"
              />
              { errors.email }
            </div>
            <div className="input_block">
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={onInputChange}
                placeholder="Password"
              />
              { errors.password }
            </div>
            <input type="submit" className="input_button" />
          </form>
        </div>
      )}
    </Form>
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
