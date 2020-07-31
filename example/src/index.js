import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import App from './App'


if (window.parent === window) {
  const iframe = document.createElement('iframe')
  iframe.src = '/'
  document.body.appendChild(iframe)
  ReactDOM.render(<App targetWindow={iframe.contentWindow} />, document.getElementById('root'))
} else {
  ReactDOM.render(<App targetWindow={window.parent} />, document.getElementById('root'))
}