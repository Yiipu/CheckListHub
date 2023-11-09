import CheckListProvider from '@/context/StateCheckListProvider'
import styles from "./page.module.css"
import getSession from '@/util/getSession'

async function getData(slug: number) {
    const res = await fetch(`${process.env.BE_URL}checklist/${slug}`,
        {
            next: { revalidate: 0 },
            headers: {
                'uid': `${getSession()?.id}`
            }
        })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Layout({
    params,
    children,
}: {
    params: { slug: number },
    children: React.ReactNode,
}) {
    const data: CheckList = await getData(params.slug)

    return (
        <>
            <h2 className={styles.header}>{data.header} <span className='text-xs'>Template ID: {data.id}</span></h2>
            <CheckListProvider value={data}>
                {children}
            </CheckListProvider>
        </>
    )
}
