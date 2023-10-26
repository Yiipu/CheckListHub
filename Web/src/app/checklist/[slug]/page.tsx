async function getData(slug: number) {
    // TODO: 从后端获取数据
    const res = await fetch(`http://localhost:3000/api/mock/checklist?id=${slug}`)

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Page({ params }: { params: { slug: number } }) {

    const data: CheckList = await getData(params.slug)

    return (
        <>
            <p>ID: {data.id}</p>
            <ul>
                {data.topicList.map((item, index) => (
                    <li key={index}><a href={`#section-${item}`}>{item}</a></li>
                ))}
            </ul>
            <ul>
                {data.priorityList?.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <ul>
                {data.tagList.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <ul>
                {data.itemGroups.map((item, index) => (
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