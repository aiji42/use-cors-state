import { useState, useEffect, useRef } from 'react'
import postRobot from 'post-robot'

export const useCorsState = (synchronizingKey, targetOring = { window }, initialValue) => {
  const [state, setState] = useState(initialValue)
  const sendable = useRef(true)

  useEffect(() => {
    const literner = postRobot.on(synchronizingKey, targetOring, ({ data }) => {
      sendable.current = false
      setState(data)
    })
    return () => literner.cancel()
  }, [])

  useEffect(() => {
    sendable.current && postRobot.send(targetOring.window, synchronizingKey, state)
    sendable.current = true
  }, [state])

  return [state, setState]
}
