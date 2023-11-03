'use client'

import { useContext, useState } from "react"
import styles from "./page.module.css"
import CollapseBox from "@/components/container/CollapseBox"
import { CheckList } from '@/context/CheckListProvider'

export default function Page() {

    const [priFilter, setPriFilter] = useState<Array<string>>([])
    const [tagFilter, setTagFilter] = useState<Array<string>>([])
    const [disablePriFilter, setDisablePriFilter] = useState<boolean>(true)
    const [disableTagFilter, setDisableTagFilter] = useState<boolean>(true)

    const data = useContext(CheckList)

    return (
        <>
            <p>ID: {data.id}</p>
            <div className={styles.banner}>
                <ul className={styles.sectionList}>
                    {data.topicList.map((item, index) => (
                        <li key={index}><a href={`#section-${item}`}>{item}</a></li>
                    ))}
                </ul>
                <ul className={styles.tagList}>
                    <button>disableTagFilter</button>
                    {data.tagList.map((item, index) => (
                        <li key={index}><button>{item}</button></li>
                    ))}
                </ul>
                <ul className={styles.priorityList}>
                    <button>disablePriFilter</button>
                    {data.priorityList?.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div>
                <ul>
                    {data.itemGroups.map((group, index) => (
                        <li key={index}>
                            <h3 id={`section-${group.topic}`} className={styles.nav}>{group.topic}</h3>
                            {group.items
                                .filter((item) => (
                                    disablePriFilter
                                    || priFilter.find((pri) => (pri == item.priority))
                                ))
                                .filter((item) => (
                                    disableTagFilter
                                    || tagFilter.find((tagf) => (item.tags?.find((tagi) => (tagi == tagf))))
                                ))
                                .map((item, index) => (
                                    <CollapseBox key={index}
                                        title={
                                            <h4 className={styles.itemTitle}>{item.title}</h4>
                                        }
                                        subtitle={
                                            <div className="flex">
                                                <span className="mr-4">{item.priority}</span>
                                                <ul className="flex flex-1">
                                                    {item.tags?.map((tag, index) => (
                                                        <li key={index} className="mr-2">{tag}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        }
                                        className={styles.item}
                                    >
                                        <p>{item.description}</p>
                                    </CollapseBox>
                                ))}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}