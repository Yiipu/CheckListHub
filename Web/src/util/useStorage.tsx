'use client'
import { Session } from '@/context/SessionProvider'
import { StateCheckList } from '@/context/StateCheckListProvider'
import { useState, useEffect, useContext } from 'react'

async function postProgress(progress: boolean[], stateCheckList: StateChecklist, session: GithubSession) {
    console.log(JSON.stringify(progress))
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_FE_URL}checklist/progress`,
        {
            method: 'GET',
            headers: {
                uid: `${session?.id}`,
                tid: `${stateCheckList.state.teamid}`,
                cid: `${stateCheckList.checklist.id}`,
                progress: JSON.stringify(progress)
            },
        })
    return res
}

export default function useStorage(key: string, initialValue: string) {
    const isBrowser = typeof window !== 'undefined'
    const session = useContext(Session)
    const stateCheckList = useContext(StateCheckList)
    const remoteProgress = stateCheckList.state.progress
    console.log(stateCheckList.state.teamid)
    const isTeam = stateCheckList.state.teamid !== '0'
    console.log(remoteProgress)

    const [storedValue, setStoredValue] = useState(() => {
        if (isBrowser) {
            if (session && isTeam) {
                if (!remoteProgress) {
                    return JSON.parse(initialValue)
                }
                console.log(`remoteProgress ${remoteProgress}`)
                console.log(`获取进度：${remoteProgress.length ? remoteProgress : initialValue}`)
                return remoteProgress.length ? remoteProgress : JSON.parse(initialValue)
            } else {
                const item = localStorage.getItem(key)
                console.log(item)
                return item ? JSON.parse(item) : JSON.parse(initialValue)
            }
        }
        return JSON.parse(initialValue)
    })

    useEffect(() => {
        if (session && isTeam) {
            postProgress(storedValue, stateCheckList, session)
        } else {
            console.log(storedValue)
            localStorage.setItem(key, JSON.stringify(storedValue))
        }
    }, [isTeam, key, session, stateCheckList, storedValue])

    return [storedValue, setStoredValue]
}
