import React from "react"
import propTypes from "prop-types"
import "./Note.css"
import { connect } from "react-redux"
import { updateNote } from "../../actions/noteActions"
import { titleValidations } from '../../validations'
import Form from '../Form'

const closeClickHandler = ({ closeNote }) => (ev) => {
  ev.preventDefault()
  closeNote()
}

const onSubmit = ({ updateNote, note, closeNote }) => ({ title, description, finished }) => {
  updateNote({ id: note.id, finished, title, description })
  closeNote()
}

const updateStateValuesOnPropsChange = (propsValues, stateValues) => (
  propsValues.id === stateValues.id ? stateValues : propsValues
)

function Note(props) {
  const { note } = props
  if (!note) return null

  return (
    <Form
      initialValues={note.toJS()}
      validations={ { title: titleValidations } }
      onSubmit={onSubmit(props)}
      updateStateValuesOnPropsChange={updateStateValuesOnPropsChange}
    >
      {({ onInputChange, handleSubmit, errors, values }) => (
        <article className="note">
          <div className="note__header">
            <label className="custom-checkbox">
              <input
                type="checkbox"
                name="finished"
                checked={values.finished}
                onChange={onInputChange}>
              </input>
              <span className="checkbox-indicator"></span>
            </label>
            <textarea
              value={values.title}
              onChange={onInputChange}
              className="note__title"
              name="title"
              placeholder="Title" />
            { errors.title }
          </div>
          <div className="note__content">
            <textarea
              value={values.description}
              onChange={onInputChange}
              className="note__description"
              name="description"
              placeholder="Description"
              rows="1" />
            <div className="note__buttons">
              <button onClick={handleSubmit} className="button">save</button>
              <button onClick={closeClickHandler(props)} className="button">close</button>
            </div>
          </div>
        </article>
      )}
    </Form>
  )
}

Note.propTypes = {
  note: propTypes.shape({
    id: propTypes.string,
    title: propTypes.string,
    description: propTypes.string,
    finished: propTypes.bool
  }),
  closeNote: propTypes.func.isRequired,
  updateNote: propTypes.func.isRequired,
  openedNoteId: propTypes.string,
}

export default connect((state, ownProps) => ({
 note: state.notes.entities.get(ownProps.openedNoteId)
}), { updateNote })(Note);
