const mockList: ckList = {
    name: "我的清单",
    owner: null,
    navList: ["导航项1", "导航项2", "导航项3"],
    tagList: ["标签1", "标签2", "标签3"],
    prioritys: ["高优先级", "中优先级", "低优先级"],
    ckItemGroups: [
        {
            nav: "导航项1",
            ckItems: [
                {
                    title: "任务1",
                    description: "完成任务1",
                    tags: ["标签1"],
                    priority: null,
                },
                {
                    title: "任务2",
                    description: "完成任务2",
                    tags: ["标签2"],
                    priority: null,
                }
            ]
        },
        {
            nav: "导航项2",
            ckItems: [
                {
                    title: "任务3",
                    description: "完成任务3",
                    tags: ["标签1","标签2"],
                    priority: null,
                }
            ]
        },
        {
            nav: "导航项3",
            ckItems: [
                {
                    title: "任务4",
                    description: "完成任务4",
                    tags: ["标签1","标签2"],
                    priority: null,
                }
            ]
        },
    ],
    source: "https://example.com"
}

const mockListList:ckListList={
    owner: null,
    ckLists: [mockList]
}

export { mockList, mockListList}