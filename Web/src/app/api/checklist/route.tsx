import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('id')
  const res = await fetch(`${process.env.BE_URL}/checklsit/${query}`, {
    next: { revalidate: 0 },
    headers: request.headers,
    method: request.method
  })
  console.log(`${process.env.BE_URL}/checklsit/${query}`)
  return res.json()
}
