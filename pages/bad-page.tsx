import React from 'react'

import { SSRPage, withServerSideProps } from '../lib/module'

const BadPage: SSRPage = (props) => {
  return <p>This page will never render, because it throws an error</p>
}

export const getServerSideProps = withServerSideProps(() => {
  // and we just need to pass extra ones to get them merged

  return {
    props: {
      err: {
        code: 'uh-oh',
        status: 500,
      },
    },
  }
})

export default BadPage
