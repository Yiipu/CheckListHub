import '@/styles/globals.css'
import { UIProvider } from '@/context/UIProvider'
import SessionProvider from '@/context/SessionProvider'
import SearchBtn from '@/components/button/SearchBtn'
import LoginBtn from '@/components/button/LoginBtn'
import getSession from '@/util/getSession'

/* 如何使用 session 上下文
在客户端组件:
import { useContext } from "react"
import { SessionContext } from "@/components/ContextProvider"
*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  const session = getSession()
  console.log(`test-3.3`)

  return (
    <html lang="en">
      <head>
        <title>CheckListHub</title>
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="white" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="black" />
      </head>
      <body>
        <SessionProvider value={session}>
          <UIProvider>
            <div className="container-md">
              <header className="m-2 md:h-[5rem] gap-1 py-2 justify-items-center items-center grid grid-flow-row-dense border-2 border-sky-500 rounded-t-2xl">
                <h1 className="text-3xl"><a href="/">CheckListHub</a></h1>
                <div className="md:col-start-5"><SearchBtn /></div>
                <div className="md:col-start-6"><LoginBtn /></div>
              </header>
              {children}
              <footer>
                <a href="http://github.com/Yiipu/checklisthub" className="fixed bottom-0">Give us a ⭐ on GitHub</a>
              </footer>
            </div>
          </UIProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
