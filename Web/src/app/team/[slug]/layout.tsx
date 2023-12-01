import CheckListProvider from '@/context/StateCheckListProvider'
import styles from "./page.module.css"
import getSession from '@/util/getSession'

async function getCid(slug: number) {
    console.log(`${process.env.BE_URL}share/${slug}`)
    const res = await fetch(`${process.env.BE_URL}share/${slug}`,
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

async function getChecklist(cid: string, tid: string) {
    console.log(`${process.env.BE_URL}checklist/${cid}`)
    const res = await fetch(`${process.env.BE_URL}checklist/${cid}`,
        {
            next: { revalidate: 0 },
            headers: {
                'uid': `${getSession()?.id}`,
                'tid': `${tid}`
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
    const cidRes: {
        'data': string
    } = await getCid(params.slug)

    console.log(`res: ${cidRes.data}`)

    const checklistRes: {
        'data': {
            'cid': string,
            'checklist': CheckList,
            'header': string,
            'progress': string,
        }
    } = await getChecklist(cidRes.data, params.slug.toString())
    const checklist: CheckList = checklistRes.data.checklist
    checklist.id = checklistRes.data.cid

    if (checklistRes.data.progress.length == 0) {
        checklistRes.data.progress = ''
    }

    console.log(checklistRes.data.progress)
    const progress: Array<boolean> = JSON.parse(checklistRes.data.progress)

    const state: ChecklistState = {
        'marked': false,
        'progress': progress,
        'teamid': params.slug.toString(),
    }

    const stateChecklist: StateChecklist = {
        checklist: checklist,
        state: state,
    }

    console.log(state)

    return (
        <>
            <h2 className={styles.header}>{checklist.header} <span className='text-xs'>Template ID: {checklist.id}</span></h2>
            <CheckListProvider value={stateChecklist}>
                {children}
            </CheckListProvider>
        </>
    )
}
