'use client'
import LoginBtn from "@/components/auth/LoginBtn"
import { NextUIProvider } from '@nextui-org/react'

export default function Home() {
  return (
    <>
      <NextUIProvider>
        <header className="h-[10rem] bg-cyan-200 dark:bg-cyan-800">
          <h1 className="font-mono text-3xl text-center">CheckListHub</h1>
          <LoginBtn />
        </header>
      </NextUIProvider>
    </>
  )
}
