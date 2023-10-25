export const MockList: CheckList = {
    header: "样品清单",
    owner: null,
    topicList: ["导航项1", "导航项2", "导航项3"],
    tagList: ["标签1", "标签2", "标签3"],
    priorityList: ["高优先级", "中优先级", "低优先级"],
    itemGroups: [
        {
            topic: "导航项1",
            items: [
                {
                    title: "任务1",
                    description: "完成任务1",
                    tags: ["标签1"],
                    priority: null,
                },
                {
                    title: "任务2",
                    description: "完成任务2",
                    tags: ["标签1"],
                    priority: null,
                }
            ]
        },
        {
            topic: "导航项2",
            items: [
                {
                    title: "任务3",
                    description: "完成任务3",
                    tags: ["标签1"],
                    priority: null,
                }
            ]
        }
    ],
    sourceUrl: "https://example.com"
}