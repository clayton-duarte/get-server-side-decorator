import React, { FunctionComponent, useMemo } from 'react'
import Error from 'next/error'

import ConfigProvider from '../contexts/ConfigProvider'
import { SSRAppProps } from '../lib/module'

const App: FunctionComponent<SSRAppProps> = ({ Component, pageProps }) => {
  // error boundary
  const appContent = useMemo(() => {
    if (pageProps.err) {
      return (
        <Error statusCode={pageProps.err.status} title={pageProps.err.code} />
      )
    }

    return <Component {...pageProps} />
  }, [pageProps])

  return (
    // here is where we hydrate the client context with server props
    <ConfigProvider value={pageProps}>
      {appContent}
      <style jsx global>{`
        body {
          font-family: sans-serif;
        }
      `}</style>
    </ConfigProvider>
  )
}

export default App
