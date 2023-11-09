import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  const res = await fetch(
    `${process.env.BE_URL}search/${query}`,
    {
      next: { revalidate: 0 }, // 不缓存。到后期稳定后应该调整
      method: 'GET',
    })

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res
}
