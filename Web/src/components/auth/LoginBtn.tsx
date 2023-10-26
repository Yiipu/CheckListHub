'use client'
import { Button, useDisclosure } from "@nextui-org/react"

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react"

import { provider } from "@/config/auth.config"
import { useContext } from "react"
import { SessionContext } from "@/components/ContextProvider"

export default function LoginBtn() {

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const session = useContext(SessionContext)

  return (
    session.id?.length ?
      <>
        <p>signed in as {session.name || session.id} with {session.idp}</p>
        <a href="/.auth/logout">Sign out</a>
      </>
      :
      <>
        <Button onPress={onOpen}>Sign in</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark:bg-black">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Sign in</ModalHeader>
                <ModalBody>
                  {provider.map((idp, index) => (<Button key={index}><a href={`/.auth/login/${idp}`}>Sign in with {idp}</a></Button>))}
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onPress={onClose}>
                    Cancle
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
  )
}
