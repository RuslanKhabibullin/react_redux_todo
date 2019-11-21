import React from "react"
import "./NewDashboardNoteItem.css"
import { createNote } from "../../actions/noteActions"
import { connect } from "react-redux"
import propTypes from "prop-types"
import { titleValidations } from "../../validations"
import Form from "../Form"

const onSubmit = ({ createNote, token }) => ({ title }, { resetForm }) => {
  createNote(token, { title })
  resetForm()
}
const noteCreationClickHandler = (handleSubmit) => (ev) => ev.key === "Enter" ? handleSubmit(ev) : null

function NewDashboardNoteItem(props) {
  return (
    <Form
      initialValues={ { title: "" } }
      validations={ { title: titleValidations } }
      onSubmit={onSubmit(props)}
    >
      {({ onInputChange, handleSubmit, values }) => (
        <div className="new-note">
          <input
            name="title"
            type="text"
            className="new-note__input"
            placeholder="Add note"
            value={values.title}
            onChange={onInputChange}
            onKeyPress={noteCreationClickHandler(handleSubmit)}>
          </input>
        </div>
      )}
    </Form>
  )
}

NewDashboardNoteItem.propTypes = {
  createNote: propTypes.func.isRequired
}

const mapStateToProps = ({ user }) => {
  return { token: user.authentication.token }
}

export default connect(mapStateToProps, { createNote })(NewDashboardNoteItem)
