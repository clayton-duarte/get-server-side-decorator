import React from 'react'

import ConsumeContext from '../components/ConsumeContext'
import { SSRPage, withServerSideProps } from '../lib/module'

interface HomeProps {
  venueXRefID: string
}

const Home: SSRPage<HomeProps> = (props) => {
  // props here is the combination of this page props and the ones provided by the decorator

  return (
    <>
      <h1>home</h1>
      <ConsumeContext />
      <p>props</p>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  )
}

export const getServerSideProps = withServerSideProps<HomeProps>(() => {
  // please see more examples on /pages/hello
  return { props: { venueXRefID: '12312' } }
})

export default Home
