import './globals.css'
import { headers } from 'next/headers'
import { SessionProvider, UIProvider } from '@/components/ContextProvider'

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
            {children}
          </UIProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
