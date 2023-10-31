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

export function CollectionListBody({
  data,
}: {
  data?: ChecklistCollection,
}) {
  return (
      <ol className="overflow-auto h-full">
        {data?.ckLists.map((item, index) => (<li key={index}><a href={`/checklist/${item.id}`} className="block h-12">{item.header}</a></li>))}
      </ol>
  )
}