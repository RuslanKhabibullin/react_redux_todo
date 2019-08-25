import React from 'react'

export default function StateButton({ clickHandler, state }) {
  const stateValue = state === 'finished' ? 'Start Again' : 'Finish'
  return <button onClick={clickHandler} className="button">{stateValue}</button>
}
