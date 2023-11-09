'use client'
import { Button, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react"

import { useContext, useState } from "react"
import { Session } from "@/context/SessionProvider"
import { CheckList } from "@/context/CheckListProvider"

export default function MarkBtn({
    children,
}: {
    children: string,
}) {

    const session = useContext(Session)
    const checklist = useContext(CheckList)

    const onProgress = useState(false)

    return (
        <Popover placement="bottom">
            {session ? <PopoverTrigger><Button>{children}</Button></PopoverTrigger> : <Button isDisabled>{children}</Button>}
            <PopoverContent className="dark:bg-black">
                <div className="px-1 py-2">
                    <p className="mb-[1rem]">Cooperate with team on this checklist</p>
                    <Button className="w-full" onClick={async () => {
                        const res = await fetch(
                            `${process.env.FE_URL}collection`,
                            {
                                next: { revalidate: 0 },
                                method: 'GET',
                                headers: {
                                    'x-ms-client-principal-id': `${session?.id}`,
                                    'checklist-id': `${checklist.id}`
                                }
                            })
                    }}>Generate Link</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
