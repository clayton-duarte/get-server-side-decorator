import React, { FunctionComponent } from 'react'
import { useConfigContext } from '../contexts/ConfigProvider'

// just a nested component consuming the context
const ConsumeContext: FunctionComponent = () => {
  const pageContext = useConfigContext()

  return (
    <>
      <p>context</p>
      <pre>{JSON.stringify(pageContext, null, 2)}</pre>
    </>
  )
}

export default ConsumeContext
