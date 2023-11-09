import { NextRequest } from "next/server"
import sleep from "@/util/sleeper"

export async function GET(request: NextRequest) {
  // await sleep(200)
  return Response.json({id:123})
}
