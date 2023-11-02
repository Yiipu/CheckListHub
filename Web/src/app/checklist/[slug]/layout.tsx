import Page from "./page"
import styles from "./page.module.css"

async function getData(slug: number) {
    const res = await fetch(`http://localhost:3000/api/mock/checklist?id=${slug}`,{ cache: 'no-store' })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Layout({
    params,
}: {
    params: { slug: number },
}) {
    const data: CheckList = await getData(params.slug)

    return (
        <>
            <h2 className={styles.header}>{data.header}</h2>
            <Page data={data}/>
        </>
    )
}
