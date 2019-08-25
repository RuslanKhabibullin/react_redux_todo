import React, { Fragment } from 'react'
import propTypes from 'prop-types'
import editViewToggable from '../../decorators/editViewToggable'

 function Description({ description, changeDescriptionHandler, currentInputErrors, editView }) {
  if (editView || !description) {
    return (
      <Fragment>
        <textarea
          value={description}
          onChange={changeDescriptionHandler}
          className="note__description"
          placeholder="Description" />
        { currentInputErrors }
      </Fragment>
    )
  } else {
    return <p className="note__description">{description}</p>
  }
}

Description.propTypes = {
  description: propTypes.string,
  changeDescriptionHandler: propTypes.func.isRequired,
  currentInputErrors: propTypes.object,
  editView: propTypes.bool.isRequired
}

export default editViewToggable(Description)
