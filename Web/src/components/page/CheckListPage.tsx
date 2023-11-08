'use client'

import { useContext } from "react"
import styles from "./page.module.css"
import CollapseBox from "@/components/container/CollapseBox"
import { CheckList } from '@/context/CheckListProvider'
import { Session } from "@/context/SessionProvider"
import useLocalStorage from "@/util/useLocalStorage"
import CheckItem from "../button/CheckItem"

export default function CheckListPage() {

    const data = useContext(CheckList)
    var offset = -1

    const itemNum = countCheckItems(data)
    const userId = useContext(Session)?.id
    const checkListId = data.id

    const progress_LS_Key = `progress_${userId}_${checkListId}`

    const [progress, setProgress] = useLocalStorage(progress_LS_Key, JSON.stringify(Array(itemNum).fill(false)))

    function onProgressUpdate(position:number, state:boolean) {
        setProgress(progress.map((b: any, i: number) => {
            if (i == position)
                return state
            else
                return b
        }))
        localStorage.setItem(progress_LS_Key, JSON.stringify(progress))
    }

    return (
        <>
            <p>ID: {data.id}</p>
            <div className={styles.banner}>
                <ul className={styles.sectionList}>
                    {data.topicList?.map((item, index) => (
                        <li key={index}><a href={`#section-${item}`}>{item}</a></li>
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
                        .map((item, index) => {
                            offset = offset + 1
                            return <CheckItem 
                            key={index} 
                            item={item} 
                            offset={offset} 
                            state={progress.at(offset)}
                            onProgressUpdate={onProgressUpdate}/>
                        })
                    :
                    <ul key={index}>
                        {group.items.map((subItem, subIndex) => (
                            renderGroups(subItem, subIndex, depth + 1)
                        ))}
                    </ul>}
            </>
        </CollapseBox>
    }
}

/**
 * TODO: 优化
 * 用来初始化进度数组。
 * @param checklist 清单
 * @returns 清单中 item 的数目
 */
function countCheckItems(checklist: CheckList): number {
    let count = 0;

    function countInGroup(group: ItemGroup | TopicGroup) {
        if (isItemGroup(group)) {
            count += group.items.length;
        } else {
            group.items.forEach(subGroup => countInGroup(subGroup));
        }
    }

    checklist.itemGroups.forEach(group => countInGroup(group));

    return count;
}

/*  检查是否是 ItemGroup 类型
    : group is ItemGroup 这部分是谓词部分，
    它表示函数 isItemGroup 将用于确定传入的参数 group 是否为 ItemGroup 类型。
    如果谓词返回 true，则 TypeScript 将在调用该函数后将参数 group 视为 ItemGroup 类型。*/
function isItemGroup(group: TopicGroup | ItemGroup): group is ItemGroup {
    return (group as ItemGroup).items[0].title !== undefined;
}
