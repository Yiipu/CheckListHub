'use client'
import { Button } from "@nextui-org/react"

import { useContext, useState } from "react"
import { Session } from "@/context/SessionProvider"
import { CheckList } from "@/context/CheckListProvider"

export default function MarkBtn({
    added_prompt,
    not_added_prompt,
}: {
    added_prompt: string,
    not_added_prompt: string,
}) {

    const session = useContext(Session)
    const checklist = useContext(CheckList)

    const [isLoading, setIsLoading] = useState(false)
    const [isAdded, setIsAdded] = useState(false)

    const [error, setError] = useState(false)

    async function getData(method: string) {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_FE_URL}favor`,
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
        session ? <Button onClick={async () => {
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
            }else{
                setError(true)
            }
        }}>{isAdded ? added_prompt : not_added_prompt}</Button > : <Button isDisabled>{not_added_prompt}</Button>
    )
}
