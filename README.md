# use-cors-state

> Custom hooks for sharing state between different components across cross-domains.

[![NPM](https://img.shields.io/npm/v/use-cors-state.svg)](https://www.npmjs.com/package/use-cors-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-cors-state
```

## Usage

```jsx
import React, { Component } from 'react'

import { useMyHook } from 'use-cors-state'

const Example = () => {
  const example = useMyHook()
  return (
    <div>{example}</div>
  )
}
```

## License

MIT © [aiji42](https://github.com/aiji42)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
