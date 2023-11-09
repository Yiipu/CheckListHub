import CheckListProvider from '@/context/StateCheckListProvider'
import styles from "./page.module.css"
import getSession from '@/util/getSession'

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

async function getMarked(slug: number) {
    const res = await fetch(`${process.env.BE_URL}checklist/favor/${slug}`,
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

async function getTeamid(slug: number) {
    const res = await fetch(`${process.env.BE_URL}share/get`,
        {
            next: { revalidate: 0 },
            headers: {
                'uid': `${getSession()?.id}`,
                'cid': `${slug}`
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
            'progress': Array<boolean>
        }
    } = await getChecklist(params.slug.toString(), '0')
    const checklist: CheckList = res.data.checklist
    checklist.id = res.data.cid

    const res_isMarked: {
        'data': boolean
    } = await getMarked(params.slug)
    const isMarked = res_isMarked.data

    const progress = res.data.progress

    const res_teamid: {
        'data': number
    } = await getTeamid(params.slug)
    const teamid = res_teamid.data == -1 ? '' : `${res_teamid.data}`

    const state: ChecklistState = {
        'marked': isMarked,
        'progress': progress,
        // 'progress': [],
        'teamid': teamid,
    }

    console.log(teamid)

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
