'use client'
import { Button, Popover, PopoverContent, PopoverTrigger, Snippet, useDisclosure } from "@nextui-org/react"

import { useContext, useState } from "react"
import { Session } from "@/context/SessionProvider"
import { StateCheckList } from "@/context/StateCheckListProvider"

export default function ShareBtn({
    children,
}: {
    children: string,
}) {

    const session = useContext(Session)
    const checklist = useContext(StateCheckList).checklist

    const [isLoading, setIsLoading] = useState(false)
    const [team, setTeam] = useState<string>(useContext(StateCheckList).state.teamid)

    async function getData() {
        const res = await fetch(
            `api/share`,
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
            {session ? <PopoverTrigger><Button>{children}</Button></PopoverTrigger> : <Button isDisabled>{children}</Button>}
            <PopoverContent className="dark:bg-black">
                <div className="px-1 py-2">
                    <p className="mb-[1rem]">Cooperate with team on this checklist</p>
                    {!team ? <Button className="w-full" onClick={async () => {
                        setIsLoading(true)
                        const res: { 'data': string } = await getData()
                        setIsLoading(false)
                        setTeam(res.data)
                    }}>{isLoading ? 'Working...' : 'Generate Link'}</Button>
                        :
                        <Snippet variant="bordered" className="text-white">{`${process.env.NEXT_PUBLIC_HOME_URL}team/${team}`}</Snippet>}
                </div>
            </PopoverContent>
        </Popover>
    )
}
