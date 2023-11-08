import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('id')
  const res = await fetch(`${process.env.BE_URL}/collection/${query}`, {
    headers: request.headers,
    method: request.method
  })
  return res.json()
}
