import React from 'react'
import { useMyHook } from 'use-cors-state'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App