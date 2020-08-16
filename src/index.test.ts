import { useCorsState } from './'
import { renderHook, act } from '@testing-library/react-hooks'
import postRobot from 'post-robot'

describe('useCorsState', () => {
  it('initial value is set correctly', () => {
    const { result } = renderHook(() => useCorsState('test1', { window }, 'initialValue'))
    expect(result.current[0]).toBe('initialValue')
  })

  it('the value can be set with setState', () => {
    const { result } = renderHook(() => useCorsState('test2', { window }, 'initialValue'))
    act(() => {
      result.current[1]('updatedValue')
    })
    expect(result.current[0]).toBe('updatedValue')
  })

  it('a message event fires when setState is executed', () => {
    const { result } = renderHook(() => useCorsState('test3', { window }, 'initialValue'))

    act(() => {
      let counter = 0
      const example = ({ data }: MessageEvent) => {
        const parsedData: {[k: string]: any} = JSON.parse(data)
        if (Object.values(parsedData)[0].name !== 'test3') return
        if (counter === 0) expect(Object.values(parsedData)[0].data).toBe('initialValue')
        if (counter === 1) expect(Object.values(parsedData)[0].data).toBe('updatedValue')
        counter += 1
      }
      window.addEventListener('message', example)
      result.current[1]('updatedValue')
    })
  })

  it('synchronize when a message event is fired', () => {
    const { result } = renderHook(() => useCorsState('test4', { window }, 'initialValue'))
    postRobot.send(window, 'test4', 'updatedValue').then(() => expect(result.current[0]).toBe('updatedValue')).catch((e) => { throw e })
  })
})
