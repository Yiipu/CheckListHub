import '@/styles/globals.css'
import { headers } from 'next/headers'
import { UIProvider } from '@/context/UIProvider'
import SessionProvider from '@/context/SessionProvider'
import SearchBtn from '@/components/button/SearchBtn'
import LoginBtn from '@/components/button/LoginBtn'

function getSession() {
  const headersList = headers()
  const session: GithubSession | null = headersList.get('X-MS-CLIENT-PRINCIPAL-ID') ? {
    id: headersList.get('X-MS-CLIENT-PRINCIPAL-ID'),
    idp: headersList.get('X-MS-CLIENT-PRINCIPAL-IDP'),
    token: headersList.get('X-MS-TOKEN-GITHUB-ACCESS-TOKEN'),
  } : null
  return session
}

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
