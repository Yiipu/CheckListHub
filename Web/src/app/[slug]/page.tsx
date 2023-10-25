import { MockList } from "@/models/samples"

async function getData(slug: string) {
    // TODO: 从后端获取数据
    const res = await fetch(`api/getlist?id=${slug}`)
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
}

export default async function Page({ params }: { params: { slug: string } }) {

    //const data = await getData(params.slug)
    const list = MockList
    
    return (
        <>
            <ul>
                {list.topicList.map((item, index) => (
                    <li key={index}><a href={`#section-${item}`}>{item}</a></li>
                ))}
            </ul>
            <ul>
                {list.priorityList?.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <ul>
                {list.tagList.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <ul>
                {list.itemGroups.map((item, index) => (
                    <li key={index}>
                        <h3 id={`section-${item.topic}`}>{item.topic}</h3>
                        <ul>
                            {item.items.map((item, index) => (
                                <li key={index}>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                    <ul>
                                        {item.tags?.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    )
}