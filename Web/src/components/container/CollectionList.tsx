import React from "react"

export function CollectionListHeader({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <h2 className="text-xl">{children}</h2>
  )
}

export async function CollectionListBody({
  session,
  param,
}: {
  session?: GithubSession,
  param?: string,
}) {

  async function getData() {
    const res = await fetch(
      `http://localhost:3000/api/${process.env.NODE_ENV == 'development' ? 'mock/' : ''}collection?id=${param}`,
      {
        next: { revalidate: 0 }, // 不缓存。到后期稳定后应该调整
        method: 'GET',
        headers: {
          'x-ms-client-principal-id': `${session?.id}`,
        }
      })

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    return res.json()
  }

  const data: ChecklistCollection = await getData()

  return (
    <ol className="overflow-auto h-full">
      {data?.ckLists.map((item, index) => (<li key={index}><a href={`/checklist/${item.id}`} className="block h-12">{item.header}</a></li>))}
    </ol>
  )
}