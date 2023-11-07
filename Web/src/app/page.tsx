import { CollectionListHeader, CollectionListBody } from "@/components/container/CollectionList"
import { headers } from "next/headers"

function getSession() {
  const headersList = headers()
  const session: GithubSession | undefined = headersList.get('X-MS-CLIENT-PRINCIPAL-ID') ? {
    id: headersList.get('X-MS-CLIENT-PRINCIPAL-ID'),
    idp: headersList.get('X-MS-CLIENT-PRINCIPAL-IDP'),
    token: headersList.get('X-MS-TOKEN-GITHUB-ACCESS-TOKEN'),
  } : undefined
  return session
}

export default async function Home() {

  const session = getSession()

  return (
    <>
      <main className="m-2 grid grid-cols-2 md:grid-cols-3 md:grid-rows-2">
        <div className="col-span-2 row-span-2">
          
          <CollectionListHeader>❤ Check Our Best Lists</CollectionListHeader>
          <div className="divider" />
          <CollectionListBody param="best"/>
        </div>
        <div>
          <CollectionListHeader>🕙 Recent Lists</CollectionListHeader>
          <div className="divider" />
          <div className="h-[15rem]">
            <CollectionListBody param="recent" session={session} />
          </div>
        </div>
        <div>
          <CollectionListHeader>📮 Team Lists</CollectionListHeader>
          <div className="divider" />
          <div className="h-[15rem]">
            <CollectionListBody param="team" session={session} />
          </div>
        </div>
      </main>
    </>
  )
}

