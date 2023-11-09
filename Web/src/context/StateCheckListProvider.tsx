'use client';
import { createContext } from 'react';
import { MockList } from '@/types/samples';

export const StateCheckList = createContext<StateChecklist>({
    checklist: MockList,
    state: { marked: false, progress: [] }
})

export default function CheckListProvider({
    children, value,
}: {
    children: React.ReactNode;
    value: {
        'checklist': CheckList,
        'state': ChecklistState
    };
}) {
    return <StateCheckList.Provider value={value}>{children}</StateCheckList.Provider>;
}
