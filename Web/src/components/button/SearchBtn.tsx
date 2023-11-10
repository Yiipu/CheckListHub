'use client'
import { Button, useDisclosure } from "@nextui-org/react"
import { Input } from "@nextui-org/react";

import {
    Modal,
    ModalContent,
} from "@nextui-org/react"
import { useState } from "react";

export default function SearchBtn() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    const [results, setResults] = useState<ChecklistCollection['ckLists'] | null>()

    async function getData(url: string) {
        const res = await fetch(url,
            {
                next: { revalidate: 0 },
            })

        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }

        return res.json()
    }

    return (
        <>
            <Button onPress={onOpen}>🔍 Search</Button>
            <Modal hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}
                className="dark:text-black fixed"
                backdrop="blur"
                onClose={() => (
                    setResults(null)
                )}>
                <ModalContent>
                    <ul>
                        {results?.map((item, index) => {
                            return <li key={index} className="m-2"><a href={`/checklist/${item.cid}`}>{item.header}</a></li>
                        })}
                    </ul>
                    <Input
                        isClearable
                        autoFocus
                        placeholder="search for checklists..."
                        startContent="🔍"
                        onValueChange={async (value) => {
                            if (value) {
                                console.log(value)
                                const searchParams = value
                                const res: { 'data': ChecklistCollection['ckLists'] } = await getData(`${process.env.NEXT_PUBLIC_HOME_URL}search?q=${searchParams}`)
                                const data = res.data
                                console.log(data)
                                setResults(data)
                            }
                        }} />
                </ModalContent>
            </Modal>
        </>
    )
}