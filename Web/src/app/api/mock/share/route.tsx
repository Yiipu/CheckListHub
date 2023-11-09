import { MockStarList } from "@/types/samples"
import { NextRequest } from "next/server"
import sleep from "@/util/sleeper"

export async function GET(request: NextRequest) {
  console.log('gei')
  await sleep(200)
  return Response.json({id:123})
}
