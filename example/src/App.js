import React from 'react'
import PropTypes from 'prop-types'
import { useCorsState } from 'use-cors-state'

const App = ({ targetWindow }) => {
  const [state, setState] = useCorsState('example', { window: targetWindow }, '')
  return (
    <div>
      <input type='text' value={state} onChange={(e) => setState(e.target.value)} />
      <p>Synchronized!!: {state}</p>
    </div>
  )
}

App.propTypes = {
  targetWindow: PropTypes.object.isRequired
}

export default App
