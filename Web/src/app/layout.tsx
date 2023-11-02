import '@/styles/globals.css'
import { headers } from 'next/headers'
import { SessionProvider, UIProvider } from '@/context/ContextProvider'
import SearchBtn from '@/components/button/SearchBtn'
import LoginBtn from '@/components/button/LoginBtn'

export function getSession() {
  const headersList = headers()
  const session: AzureSession | null = headersList.get('X-MS-CLIENT-PRINCIPAL-ID') ? {
    id: headersList.get('X-MS-CLIENT-PRINCIPAL-ID'),
    name: headersList.get('X-MS-CLIENT-PRINCIPAL-NAME'),
    idp: headersList.get('X-MS-CLIENT-PRINCIPAL-IDP')
  } : null
  return session
}

/* 如何使用 session 上下文
在客户端组件:
import { useContext } from "react"
import { SessionContext } from "@/components/ContextProvider"
在服务端组件：
import { getSession } from "@/app/layout"
*/

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  const session = getSession()

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
              <header className="m-2 md:h-[5rem] gap-1 justify-items-center items-center align-middle grid grid-flow-row-dense md:grid-cols-6">
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
