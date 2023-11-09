import { CollectionListHeader, CollectionListBody } from "@/components/container/CollectionList"
import getSession from "@/util/getSession"

export default async function Home() {

  const session = getSession()

  return (
    <>
      <main className="m-2 grid grid-cols-2 md:grid-cols-3">
        <div className="col-span-2 flex border-2 border-sky-500 p-2">
          <div className="hover:grow duration-75">
            <CollectionListHeader>❤ Check Our Best Lists</CollectionListHeader>
            <div className="divider" />
            <CollectionListBody param="best" session={session} />
          </div>
          <div></div>
        </div>
        <div className="border-2 border-sky-500 p-2">
          <CollectionListHeader>🕙 Recent</CollectionListHeader>
          <div className="divider" />
          <div className="h-[29rem]">
            <CollectionListBody param="recent" session={session} />
          </div>
        </div>
        <div className="border-2 border-sky-500 p-2">
          <CollectionListHeader>👌 Team</CollectionListHeader>
          <div className="divider" />
          <div className="h-[15rem]">
            <CollectionListBody param="team" session={session} />
          </div>
        </div>
        <div className="border-2 border-sky-500 p-2">
          <CollectionListHeader>📤 Upload </CollectionListHeader>
          <div className="divider" />
          <div className="h-[15rem]">
            {/* <CollectionListBody param="upload" session={session} /> */}
          </div>
        </div>
        <div className="border-2 border-sky-500 p-2">
          <CollectionListHeader>📚 Marked</CollectionListHeader>
          <div className="divider" />
          <div className="h-[15rem]">
            <CollectionListBody param="favor" session={session} />
          </div>
        </div>
      </main>
    </>
  )
}

