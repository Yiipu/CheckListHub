import { headers } from "next/headers"
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
      'http://localhost:3000/api/mock/collection?id=0',
      {
        next: { revalidate: 60 },
        method: 'GET',
        headers:{
          'x-ms-client-principal-id' : `${headers().get('')}`,
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