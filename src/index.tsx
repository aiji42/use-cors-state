import { useState, useEffect, useRef } from 'react'
import postRobot, { ServerOptionsType, WindowResolverType } from 'post-robot'

type OptionsType = {
  window: WindowResolverType
} & ServerOptionsType

export const useCorsState = (synchronizingKey: string, options: OptionsType = { window }, initialValue: any) => {
  const [state, setState] = useState(initialValue)
  const sendable = useRef<boolean>(true)

  useEffect(() => {
    const literner = postRobot.on(synchronizingKey, options, ({ data }) => {
      sendable.current = false
      setState(data)
    })
    return () => literner.cancel()
  }, [synchronizingKey, options])

  useEffect(() => {
    sendable.current && postRobot.send(options.window, synchronizingKey, state)
    sendable.current = true
  }, [state, synchronizingKey, options.window])

  return [state, setState]
}
