import { NextPage, GetServerSideProps, GetServerSidePropsContext } from 'next'
import { AppProps } from 'next/app'

// some useful types
export type SSRPage<T = {}> = NextPage<SSRProps & T>

export type ReturnProps<T> = { props: T }

export interface SSRError {
  status: number
  code: string
}

export interface SSRProps {
  readonly config?: { isLoaded: boolean }
  readonly err?: SSRError
}

export interface SSRAppProps<T = {}> extends AppProps<T & SSRProps> {
  pageProps: SSRProps
}

export type GetServerSidePropsCallback<T> = (
  ctx?: GetServerSidePropsContext & ReturnProps<SSRProps>
) => ReturnProps<T & SSRProps>

// thats the guy we wanna share
export function withServerSideProps<
  TPageProps extends { [key: string]: any } = {}
>(
  getServerSidePropsCallback: GetServerSidePropsCallback<TPageProps>
): GetServerSideProps<(TPageProps & SSRProps) | SSRProps> {
  return async (ctx) => {
    try {
      // do global stuff
      const globalProps: SSRProps = { config: { isLoaded: true } }

      // do page stuff
      const { props: pageProps } = await getServerSidePropsCallback({
        props: globalProps,
        ...ctx,
      })

      // return all props together
      return {
        props: {
          ...globalProps,
          ...pageProps,
        },
      }
    } catch (err) {
      // catch errors here!
      return {
        props: {
          err: {
            code: err.response?.data?.error?.code ?? 'unknown_error',
            status: err.response?.status ?? 500,
          },
        },
      }
    }
  }
}
