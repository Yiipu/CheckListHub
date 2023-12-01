'use client';
import { createContext } from 'react';


export const Session = createContext<GithubSession | null>(null);

export default function SessionProvider({
    children, value,
}: {
    children: React.ReactNode;
    value: GithubSession | null;
}) {
    return <Session.Provider value={value}>{children}</Session.Provider>;
}
