// 一条 check 项
interface Item {
    title: string
    description: string
    tags: string[] | null
    priority: string | null
}

// 同导航的清单集合
interface ItemGroup {
    topic: string
    items: Array<Item>
}

// 一个清单
interface CheckList {
    id: string
    header: string                        // 清单名
    owner: user | null                    // 所有者，若公开则为 null
    itemGroups: Array<ItemGroup>          // 按导航项分组的清单集合
    sourceUrl: string | null              // 清单来源的 URL，可选
    topicList: Array<string>              // 清单导航项列表
    tagList: Array<string>                // 标签列表
    priorityList: Array<string> | null    // 重要程度列表，可选
}

// 清单的列表
interface ChecklistCollection {
    id: string
    count: number
    ckLists: Array<{ header: string; id: string }>
}