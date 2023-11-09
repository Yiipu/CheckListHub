import CheckListProvider from '@/context/CheckListProvider'
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
    const res: {
        'data': {
            'checklist': CheckList,
            'cid': string,
            'header': string,
        }
    } = await getData(params.slug)
    const checklist: CheckList = res.data.checklist
    checklist.id = res.data.cid

    return (
        <>
            <h2 className={styles.header}>{checklist.header} <span className='text-xs'>Template ID: {checklist.id}</span></h2>
            <CheckListProvider value={checklist}>
                {children}
            </CheckListProvider>
        </>
    )
}
