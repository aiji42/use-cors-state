import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react'
import postRobot, { ServerOptionsType } from 'post-robot'

export const useCorsState = <T>(synchronizingKey: string, options: ServerOptionsType, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(initialValue)
  const sendable = useRef<boolean>(true)

  useEffect(() => {
    const literner = postRobot.on(synchronizingKey, options, ({ data }) => {
      sendable.current = false
      setState(data)
    })
    return () => literner.cancel()
  }, [synchronizingKey, options])

  useEffect(() => {
    sendable.current && postRobot.send((options?.window || window), synchronizingKey, state)
    sendable.current = true
  }, [state, synchronizingKey, options.window])

  return [state, setState]
}
