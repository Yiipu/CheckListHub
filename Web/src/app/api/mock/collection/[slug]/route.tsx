import { MockStarList } from "@/types/samples"
import { NextRequest } from "next/server"
import sleep from "@/util/sleeper"

export async function GET(request: NextRequest, slug: number) {
  await sleep(200)
  MockStarList.id = slug.toString()
  return Response.json(MockStarList)
}
