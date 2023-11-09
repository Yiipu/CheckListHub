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
import { Session } from "@/context/SessionProvider"

export default function LoginBtn() {

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const session = useContext(Session)

  return (
    session ?
      <>
        <Button href="/.auth/logout">🔚 Log out</Button>
      </>
      :
      <>
        <Button onPress={onOpen}>☁ Log in</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}
          className="dark:bg-black"
          backdrop="blur">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                <ModalBody>
                  {provider.map((idp, index) => (<Button key={index}><a href={`/.auth/login/${idp}`}>Log in with {idp}</a></Button>))}
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

export function UseLogin({
  children,
}: {
  children: JSX.Element,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const session = useContext(Session)

  return (
    session ?
      <></>
      :
      <div className="h-full w-full">
        <button onClick={onOpen} className="block h-full w-full">{children}</button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}
          className="dark:bg-black"
          backdrop="blur">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                <ModalBody>
                  {provider.map((idp, index) => (<Button key={index}><a href={`/.auth/login/${idp}`}>Log in with {idp}</a></Button>))}
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
      </div>
  )

}