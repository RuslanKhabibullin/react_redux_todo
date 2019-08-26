import React from 'react'
import propTypes from 'prop-types'

function StateButton({ clickHandler, state }) {
  const stateValue = state === 'finished' ? 'Start Again' : 'Finish'
  return <button onClick={clickHandler} className="button">{stateValue}</button>
}

StateButton.propTypes = {
  clickHandler: propTypes.func.isRequired,
  state: propTypes.string.isRequired
}

export default StateButton
