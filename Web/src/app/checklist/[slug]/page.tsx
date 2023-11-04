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
                    {data.topicList?.map((item, index) => (
                        <li key={index}><a href={`#section-${item}`}>{item}</a></li>
                    ))}
                </ul>
                <ul className={styles.tagList}>
                    <button>disableTagFilter</button>
                    {data.tagList?.map((item, index) => (
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
                        renderGroups(group, index, 0)
                    ))}
                </ul>
            </div>
        </>
    )

    function renderGroups(group: ItemGroup | TopicGroup, index: number, depth: number) {
        
        return <CollapseBox key={index} title={<h2 className={`text-xl`}>{group.topic}</h2>}>
            <>
                {isItemGroup(group) ?
                    group.items
                        .filter((item) => (
                            disablePriFilter
                            || priFilter.find((pri) => (pri == item.priority))
                        ))
                        .filter((item) => (
                            disableTagFilter
                            || tagFilter.find((tagf) => (item.tags?.find((tagi) => (tagi == tagf))))
                        ))
                        .map((item, index) => (
                            CheckItem(index, item)
                        ))
                    :
                    <ul key={index}>
                        {group.items.map((subItem, subIndex) => (
                            renderGroups(subItem, subIndex, depth + 1)
                        ))}
                    </ul>}
            </>
        </CollapseBox>

        function CheckItem(index: number, item: Item) {

            const [checked, setChecked] = useState(false)

            return <div key={index} className="my-2 flex">
                <button onClick={() => (setChecked(!checked))} className="mr-4">
                    {checked? '✅':'⬜'}
                </button>
                <div className="flex-1">
                    <h3 className="my-2 text-lg">{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="flex">
                        <span className="mr-4 rounded-2xl bg-orange-700 px-2 text-xs">{item.priority}</span>
                        <ul className="flex flex-1">
                            {item.tags?.map((tag, index) => (
                                <li key={index} className="mr-2 rounded-2xl bg-blue-400 px-2 text-xs">{tag}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        }
    }
}


function isItemGroup(group: TopicGroup | ItemGroup): group is ItemGroup {
    return (group as ItemGroup).items[0].title !== undefined;
}

/*  检查是否是Item类型
    item is Item: 这部分是谓词部分，
    它表示函数 isItem 将用于确定传入的参数 item 是否为 Item 类型。
    如果谓词返回 true，则 TypeScript 将在调用该函数后将参数 item 视为 Item 类型。*/
function isItem(item: Item | ItemGroup): item is Item {
    return (item as Item).title !== undefined;
}
