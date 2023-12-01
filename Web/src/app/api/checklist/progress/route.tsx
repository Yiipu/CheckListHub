import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    console.log(`${process.env.BE_URL}checklist/progress/${request.headers.get('cid')}`)
    const res = await fetch(
        `${process.env.BE_URL}checklist/progress/${request.headers.get('cid')}`,
        {
            next: { revalidate: 0 }, // 不缓存。到后期稳定后应该调整
            method: 'GET',
            headers: {
                uid: `${request.headers.get('uid')}`,
                tid: `${request.headers.get('tid')}`,
                progress: `${request.headers.get('progress')}`,
            },
        })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res
}
