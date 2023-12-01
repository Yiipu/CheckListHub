import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    const res = await fetch(
        `${process.env.BE_URL}/share`,
        {
            next: { revalidate: 0 }, // 不缓存。到后期稳定后应该调整
            method: 'GET',
            headers: {
                uid : `${request.headers.get('uid')}`,
                cid : `${request.headers.get('cid')}`
            },
        })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res
}
