'use client'
import { Button } from "@nextui-org/react"

import { useContext, useEffect, useState } from "react"
import { Session } from "@/context/SessionProvider"
import { StateCheckList } from "@/context/StateCheckListProvider"

export default function MarkBtn({
    added_prompt,
    not_added_prompt,
}: {
    added_prompt: string,
    not_added_prompt: string,
}) {

    const session = useContext(Session)
    const checklist = useContext(StateCheckList).checklist

    const [isLoading, setIsLoading] = useState(false)
    const [isAdded, setIsAdded] = useState(useContext(StateCheckList).state.marked)

    const [error, setError] = useState(false)

    async function getData(method: string) {
        const res = await fetch(
            `https://checklisthub.azurewebsites.net/api/favor`,
            {
                method: method,
                headers: {
                    'uid': `${session?.id}`,
                    'cid': `${checklist.id}`
                }
            })
        return res
    }

    return (
        session ?
            <Button onClick={async () => {
                if (isLoading)
                    return
                setIsLoading(true)
                var res
                if (isAdded) {
                    res = await getData('DELETE')
                } else {
                    res = await getData('PUT')
                }
                setIsLoading(false)
                if (res.ok) {
                    setIsAdded(!isAdded)
                    console.log(isAdded)
                } else {
                    setError(true)
                }
            }}>{isLoading? 'Working...' : isAdded ? added_prompt : not_added_prompt}</Button >
            :
            <Button isDisabled>{not_added_prompt}</Button>
    )
}
