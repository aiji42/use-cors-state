import React from 'react'
import { useCorsState } from 'use-cors-state'

const App = ({ targetWindow }) => {
  const [state, setState] = useCorsState('example', { window: targetWindow }, '')
  return (
    <div>
      <input type="text" value={state} onChange={(e) => setState(e.target.value)} />
      <p>Synchronized!!: {state}</p>
    </div>
  )
}

export default App