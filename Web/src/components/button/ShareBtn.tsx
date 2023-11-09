'use client'
import { Button, Popover, PopoverContent, PopoverTrigger, Snippet, useDisclosure } from "@nextui-org/react"

import { useContext, useState } from "react"
import { Session } from "@/context/SessionProvider"
import { CheckList } from "@/context/CheckListProvider"

export default function ShareBtn({
    children,
}: {
    children: string,
}) {

    const session = useContext(Session)
    const checklist = useContext(CheckList)

    const [isLoading, setIsLoading] = useState(false)
    const [team, setTeam] = useState<Team>()

    async function getData() {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_FE_URL}share`,
            {
                method: 'GET',
                headers: {
                    'uid': `${session?.id}`,
                    'cid': `${checklist.id}`
                }
            })
        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }
        return res.json()
    }

    return (
        <Popover placement="bottom">
            {!session ? <PopoverTrigger><Button>{children}</Button></PopoverTrigger> : <Button isDisabled>{children}</Button>}
            <PopoverContent className="dark:bg-black">
                <div className="px-1 py-2">
                    <p className="mb-[1rem]">Cooperate with team on this checklist</p>
                    {!team ? <Button className="w-full" onClick={async () => {
                        setIsLoading(true)
                        const res: {'data':Team} = await getData()
                        setIsLoading(false)
                        setTeam(res.data)
                    }}>{isLoading ? 'Loading...' : 'Generate Link'}</Button>
                        :
                        <Snippet>{team.id}</Snippet>}
                </div>
            </PopoverContent>
        </Popover>
    )
}
