import CheckListProvider from '@/context/CheckListProvider'
import styles from "./page.module.css"

async function getData(slug: number) {
    const res = await fetch(`http://localhost:3000/api/${process.env.NODE_ENV == 'development' ? 'mock/' : ''}checklist?id=${slug}`,
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
            <h2 className={styles.header}>{data.header}</h2>
            <CheckListProvider value={data}>
                {children}
            </CheckListProvider>
        </>
    )
}
