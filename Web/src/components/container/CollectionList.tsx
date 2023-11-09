import React from "react"
import { UseLogin } from "../button/LoginBtn"
import CatchedError from "./CatchedError"

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

  let error = false
  const isPublic = param == 'best'

  if (!isPublic && !session) {
    return (
      <div className="h-full">
        <UseLogin>
          <div className="h-full">you have to Login to see this</div>
        </UseLogin>
      </div>)
  }
  async function getData() {
    const verify = await fetch(
      `${process.env.BE_URL}user`,
      {
        next: { revalidate: 0 },
        method: 'GET',
        headers: {
          'uid': `${session?.id}`,
        }
      })
    console.debug(`${process.env.BE_URL}collection/${param}`)
    const res = await fetch(
      `${process.env.BE_URL}collection/${param}`,
      {
        next: { revalidate: 0 }, // 不缓存。到后期稳定后应该调整
        method: 'GET',
        headers: {
          'uid': `${session?.id}`,
        }
      })
    if (!res.ok || (!verify.ok && !isPublic)) {
      error = true
      return null
    }

    return res.json()
  }

  const res: { 'data': ChecklistCollection['ckLists'] } = await getData()
  const collection: ChecklistCollection = {
    ckLists: res.data,
    id: '',
    count: res.data.length
  }
  console.log(collection)

  return (
    !error ? <ol className="overflow-auto h-full">
      {collection?.ckLists.map((item, index) => (<li key={index}><a href={`/checklist/${item.cid}`} className="block h-[3rem] leading-[3rem]">{item.header}</a></li>))}
    </ol> : <CatchedError />
  )
}