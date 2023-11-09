import { NextRequest } from "next/server"

export async function PUT(request: NextRequest) {
    const res = await fetch(
        `${process.env.BE_URL}/checklist/favor/put/${request.headers.get('cid')}`,
        {
            next: { revalidate: 0 }, // 不缓存。到后期稳定后应该调整
            method: 'GET',
            headers: {
                uid : `${request.headers.get('uid')}`
            },
        })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res
}
export async function DELETE(request: NextRequest) {
    const res = await fetch(
        `${process.env.BE_URL}/checklist/favor/delete/${request.headers.get('cid')}`,
        {
            next: { revalidate: 0 }, // 不缓存。到后期稳定后应该调整
            method: 'GET',
            headers: {
                uid : `${request.headers.get('uid')}`
            },
        })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res
}

export async function GET(request: NextRequest) {
    const res = await fetch(
        `${process.env.BE_URL}/checklist/favor/get/${request.headers.get('cid')}`,
        {
            next: { revalidate: 0 }, // 不缓存。到后期稳定后应该调整
            method: 'GET',
            headers: {
                uid : `${request.headers.get('uid')}`
            },
        })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res
}
