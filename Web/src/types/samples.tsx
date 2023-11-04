export const MockList: CheckList = {
    id: '123',
    header: "样品清单",
    topicList: ["导航项1", "导航项2", "导航项3"],
    tagList: ["标签1", "标签2", "标签3"],
    priorityList: ["高优先级", "中优先级", "低优先级"],
    itemGroups: [
        {
            topic: "导航项1",
            items: [
                {
                    topic: "导航项1.1",
                    items: [
                        {
                            title: "任务1",
                            description: "完成任务1",
                            tags: ["标签1", "标签2"],
                            priority: "高优先级",
                        },
                        {
                            title: "任务2",
                            description: "完成任务2",
                            tags: ["标签1"],
                            priority: "中优先级",
                        }
                    ]
                },
            ]
        },
        {
            topic: "导航项2",
            items: [
                {
                    title: "任务3",
                    description: "完成任务3",
                    tags: ["标签1", "标签3"],
                    priority: "低优先级",
                }
            ]
        },
        {
            topic: "导航项3",
            items: [
                {
                    title: "任务4",
                    description: "完成任务4",
                    tags: ["标签1", "标签2"],
                    priority: "低优先级",
                }
            ]
        }
    ],
    sourceUrl: "https://example.com"
}

export const MockStarList: ChecklistCollection = {
    id: "0",
    count: 9,
    ckLists: [
        {
            header: "Checklist 1",
            id: '1'
        },
        {
            header: "Checklist 2",
            id: '2'
        },
        {
            header: "Checklist 3",
            id: '3'
        },
        {
            header: "Checklist 4",
            id: '4'
        },
        {
            header: "Checklist 5",
            id: '5'
        },
        {
            header: "Checklist 6",
            id: '6'
        },
        {
            header: "Checklist 7",
            id: '7'
        },
        {
            header: "Checklist 8",
            id: '8'
        },
        {
            header: "Checklist 9",
            id: '9'
        },
    ]
};
