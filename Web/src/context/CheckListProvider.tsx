'use client';
import { createContext } from 'react';
import { MockList } from '@/types/samples';

export const CheckList = createContext<CheckList>(MockList);

export default function CheckListProvider({
    children, value,
}: {
    children: React.ReactNode;
    value: CheckList;
}) {
    return <CheckList.Provider value={value}>{children}</CheckList.Provider>;
}
