import { NextRequest } from "next/server"

export async function GET(request: NextRequest, slug: string) {

  const query = slug.toString()

  const res = await fetch(
    `${process.env.BE_URL}search/${query}`,
    {
      next: { revalidate: 0 }, // 不缓存。到后期稳定后应该调整
      method: 'GET',
    })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
