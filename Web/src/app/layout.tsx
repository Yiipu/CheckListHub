import './globals.css'
import { headers } from 'next/headers'
import SessionProvider from '@/components/auth/SessionProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {

  const headersList = headers()
  const session:AzureSession = {
    id: headersList.get('X-MS-CLIENT-PRINCIPAL-ID') || '',
    name: headersList.get('X-MS-CLIENT-PRINCIPAL-NAME') || '',
    idp: headersList.get('X-MS-CLIENT-PRINCIPAL-IDP') || ''
  }

  return (
    <html lang="en">
      <head>
        <title>CheckListHub</title>
        <meta name="color-scheme" content="light dark"></meta>
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
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
