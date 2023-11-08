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
    const [results, setResults] = useState<{ id: string, name: string }[] | null>(null)

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
                        {results?.map((item, index) => (
                            <li key={index} className="m-2"><a href={`/checklist/${item.id}`}>{item.name}</a></li>
                        ))}
                    </ul>
                    <Input
                        isClearable
                        autoFocus
                        placeholder="search for checklists..."
                        startContent="🔍"
                        onValueChange={async (value) => {
                            if (process.env.NODE_ENV == 'production') {
                                if (!value) {
                                    const searchParams = value
                                    const res = await fetch(`${process.env.BE_URL}/search/${searchParams}`,
                                        {
                                            next: { revalidate: 0 },
                                            method: 'GET',
                                        })
                                    return res.json()
                                } else {
                                    return null
                                }
                            } else {
                                setResults(value ? [{ id: value, name: value }, { id: value, name: value }, { id: value, name: value }] : null)
                            }
                        }} />
                </ModalContent>
            </Modal>
        </>
    )
}