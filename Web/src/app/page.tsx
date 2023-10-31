import { CollectionListHeader, CollectionListBody } from "@/components/container/CollectionList"

async function getData() {
  const res = await fetch('http://localhost:3000/api/mock/collection?id=0', { next: { revalidate: 0 } })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {

  const data: ChecklistCollection = await getData()

  return (
    <>
      <main className="m-2 grid grid-flow-row-dense grid-cols-2 md:grid-cols-3 md:grid-rows-2">
        <div className="col-span-2 row-span-2">
          <CollectionListHeader>❤ Check Our Best Lists</CollectionListHeader>
          <div className="divider" />
          <CollectionListBody data={data} />
        </div>
        <div>
          <CollectionListHeader>🕙 Recent Lists</CollectionListHeader>
          <div className="divider" />
          <div className="h-[15rem]">
            <CollectionListBody data={data} />
          </div>
        </div>
        <div>
          <CollectionListHeader>📮 Team Lists</CollectionListHeader>
          <div className="divider" />
          <div className="h-[15rem]">
            <CollectionListBody data={data} />
          </div>
        </div>
      </main>
    </>
  )
}

