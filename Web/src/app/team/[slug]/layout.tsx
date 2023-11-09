import CheckListProvider from '@/context/StateCheckListProvider'
import styles from "./page.module.css"
import getSession from '@/util/getSession'

async function getCid(slug: number) {

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
        'data': {
            'cid': string,
        }
    } = await getCid(params.slug)

    const checklistRes: {
        'data': {
            'cid': string,
            'checklist': CheckList,
            'header': string,
            'progress': Array<boolean>
        }
    } = await getChecklist(cidRes.data.cid, params.slug.toString())
    const checklist: CheckList = checklistRes.data.checklist
    checklist.id = checklistRes.data.cid

    const progress = checklistRes.data.progress

    const state: ChecklistState = {
        'marked': false,
        'progress': progress,
        'teamid': params.slug.toString(),
    }

    const stateChecklist: StateChecklist = {
        checklist: checklist,
        state: state,
    }

    return (
        <>
            <h2 className={styles.header}>{checklist.header} <span className='text-xs'>Template ID: {checklist.id}</span></h2>
            <CheckListProvider value={stateChecklist}>
                {children}
            </CheckListProvider>
        </>
    )
}
