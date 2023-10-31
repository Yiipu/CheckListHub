import { MockStarList } from "@/types/samples"
import { NextRequest } from "next/server"
import sleep from "../sleeper"

export async function GET(request: NextRequest) {
  await sleep(200)
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('id')
  MockStarList.id = query || ''
  return Response.json(MockStarList)
}
