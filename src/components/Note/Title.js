import React, { Fragment } from 'react'
import propTypes from 'prop-types'
import editViewToggable from '../../decorators/editViewToggable'

function Title({ title, changeTitleHandler, currentInputErrors, editView }) {
  if (editView || !title) {
    return (
      <Fragment>
        <textarea
          value={title}
          onChange={changeTitleHandler}
          className="note__title"
          placeholder="Title" />
        { currentInputErrors }
      </Fragment>
    )
  } else {
    return <h2 className="note__title">{title}</h2>
  }
}

Title.propTypes = {
  title: propTypes.string,
  changeTitleHandler: propTypes.func.isRequired,
  currentInputErrors: propTypes.object,
  editView: propTypes.bool.isRequired
}

export default editViewToggable(Title)
