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
                onClose={()=>(
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
                        onValueChange={(value) => (
                            setResults(value?[{ id: value, name: value }, { id: value, name: value }, { id: value, name: value }]:null)
                        )} />
                </ModalContent>
            </Modal>
        </>
    )
}