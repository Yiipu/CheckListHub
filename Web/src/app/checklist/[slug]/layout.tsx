import CheckListProvider from '@/context/CheckListProvider'
import styles from "./page.module.css"

async function getData(slug: number) {
    const res = await fetch(`${process.env.FE_URL}checklist?id=${slug}`,
        { cache: 'no-store' })

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
