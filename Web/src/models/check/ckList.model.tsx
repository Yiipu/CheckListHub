// 一个清单
interface ckList{
    name: string                        // 清单名
    owner: user | null                  // 所有者，若公开则为 null
    navList: Array<string>              // 清单导航项列表
    tagList: Array<string>              // 标签列表
    prioritys: Array<string> | null     // 重要程度列表，可选
    ckItemGroups: Array<ckItemGroup>    // 按导航项分组的清单集合
    source: string | null               // 清单来源的 URL，可选
}