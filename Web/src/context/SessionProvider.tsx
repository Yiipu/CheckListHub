'use client';
import { createContext } from 'react';


export const Session = createContext<AzureSession | null>(null);

export default function SessionProvider({
    children, value,
}: {
    children: React.ReactNode;
    value: AzureSession | null;
}) {
    return <Session.Provider value={value}>{children}</Session.Provider>;
}
