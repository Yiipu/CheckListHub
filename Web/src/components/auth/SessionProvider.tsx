'use client'

import { createContext } from 'react'

const temp:AzureSession = {} // fix type problem with React Context
export const SessionContext = createContext(temp)

export default function SessionProvider({
    children,
    value,
}: {
    children: React.ReactNode,
    value: AzureSession,
}) {
    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}