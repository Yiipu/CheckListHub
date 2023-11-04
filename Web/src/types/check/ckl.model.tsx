// 一条 check 项
interface Item {
    title: string
    description?: string
    tags?: string[]
    priority?: string
}

// 同导航的清单集合
interface ItemGroup {
    topic: string
    items: Array<Item>
}

// 有子级集合的集合
interface TopicGroup{
    topic: string
    items: Array<TopicGroup | ItemGroup>
}

// 一个清单
interface CheckList {
    id: string
    header: string                             // 清单名
    owner?: user                               // 所有者，若公开则为 null
    itemGroups: Array<ItemGroup | TopicGroup>      // 按导航项分组的清单集合
    sourceUrl?: string                         // 清单来源的 URL，可选
    topicList?: Array<string>                  // 清单导航项列表
    tagList?: Array<string>                    // 标签列表
    priorityList?: Array<string>               // 重要程度列表，可选
}

// 清单的列表
interface ChecklistCollection {
    id: string
    count: number
    ckLists: Array<{ header: string; id: string }>
}