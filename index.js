import React, { useState, useMemo } from 'react'
import ReactDOM from 'react-dom'
import { createContainer } from 'unstated-next'

// store moduleA
function useModuleA() {
  const [v1, setV1] = useState(1)
  const [v2, setV2] = useState(2)
  return { v1, setV1, v2, setV2 }
}
// store moduleA
function useModuleB() {
  const [v3, setV3] = useState(0)
  return { v3, setV3 }
}

// compose store module
const useComposeModule = () => ({
  ...useModuleA(),
  ...useModuleB()
})

const Store = createContainer(useComposeModule)

const ChildA = () => {
  const { v1 } = Store.useContainer()
  return useMemo(() => <p>{v1}</p>, [v1])
}

const ChildB = () => {
  const { v2, setV2 } = Store.useContainer()
  return useMemo(() => <p onClick={() => setV2(v => v + 1)}>{v2}</p>, [v2])
}

const Page = () => (
  <div>
    <ChildA />
    <ChildB />
  </div>
)

function App() {
  return (
    <Store.Provider>
      <Page />
    </Store.Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
