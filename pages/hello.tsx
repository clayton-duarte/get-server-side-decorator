import React from 'react'

import ConsumeContext from '../components/ConsumeContext'
import { SSRPage, withServerSideProps } from '../lib/module'

interface PageProps {
  hasConfig: boolean
}

const Hello: SSRPage<PageProps> = (props) => {
  // props here is the combination of this page props and the ones provided by the decorator

  return (
    <>
      <h1>Hello</h1>
      <ConsumeContext />
      <p>props</p>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  )
}

export const getServerSideProps = withServerSideProps<PageProps>((ctx) => {
  // and we just need to pass extra ones to get them merged
  return { props: { hasConfig: !!ctx.props.config } }
})

export default Hello
