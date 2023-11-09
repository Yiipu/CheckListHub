import { MockList } from "@/types/samples"
import { NextRequest } from "next/server"
import sleep from "@/util/sleeper"

export async function GET(request: NextRequest, slug: number) {
  await sleep(200)
  const query = slug.toString()
  MockList.id = query || ''
  return Response.json(MockList)
}
