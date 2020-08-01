import { useCorsState } from './'
import { renderHook, act } from '@testing-library/react-hooks'
import postRobot from 'post-robot'

describe('useCorsState', () => {
  it('initial value is set correctly', () => {
    const { result } = renderHook(() => useCorsState('test', { window }, 'initialValue'))
    expect(result.current[0]).toBe('initialValue')
  })

  it('the value can be set with setState', () => {
    const { result } = renderHook(() => useCorsState('test', { window }, 'initialValue'))
    act(() => {
      result.current[1]('updatedValue')
    })
    expect(result.current[0]).toBe('updatedValue')
  })

  it('a message event fires when setState is executed', () => {
    const { result } = renderHook(() => useCorsState('test', { window }, 'initialValue'))
    act(() => {
      let counter = 0
      window.addEventListener('message', ({ data }) => {
        const parsedData = JSON.parse(data)
        expect(Object.values(parsedData)[0].name).toBe('test')
        if (counter === 0) expect(Object.values(parsedData)[0].data).toBe('initialValue')
        if (counter === 1) expect(Object.values(parsedData)[0].data).toBe('updatedValue')
        counter += 1
      })
      result.current[1]('updatedValue')
    })
  })

  it('synchronize when a message event is fired', () => {
    const { result } = renderHook(() => useCorsState('test', { window }, 'initialValue'))
    postRobot.send(window, 'test', 'updatedValue').then(() => expect(result.current[0]).toBe('updatedValue')).catch((e) => { throw e })
  })
})
