import React, { FunctionComponent, createContext, useContext } from 'react'

import { SSRProps } from '../lib/module'

const ConfigCtx = createContext<SSRProps>({})

const ConfigContextProvider: FunctionComponent<{ value: SSRProps }> = ({
  children,
  value,
}) => {
  return <ConfigCtx.Provider value={value}>{children}</ConfigCtx.Provider>
}

export const useConfigContext = () => {
  return useContext(ConfigCtx)
}

export default ConfigContextProvider
