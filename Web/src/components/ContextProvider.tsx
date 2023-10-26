'use client'
import { NextUIProvider } from '@nextui-org/react'

export function UIProvider({
    children,
}: {
    children: React.ReactNode,
}) {
    return <NextUIProvider>{children}</NextUIProvider>
}

import { createContext } from 'react'

const temp:AzureSession = {} // fix type problem with React Context
export const SessionContext = createContext(temp)

export function SessionProvider({
    children,
    value,
}: {
    children: React.ReactNode,
    value: AzureSession,
}) {
    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}