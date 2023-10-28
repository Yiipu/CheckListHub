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

export const SessionContext = createContext<AzureSession | null>(null)

export function SessionProvider({
    children,
    value,
}: {
    children: React.ReactNode,
    value: AzureSession | null,
}) {
    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
}