import { useEffect, useState } from "react"

export default function CheckItem({
    item,
    offset,
    state,
    onProgressUpdate,
}: {
    item: Item,
    offset: number,
    state: boolean,
    onProgressUpdate: (position: number, state: boolean) => void,
}) {

    const [checked, setChecked] = useState(state)
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
      }, [])

    function HandleClickEvent() {
        setChecked(!checked)
        onProgressUpdate(offset, !checked)
    }

    return <div className="my-2 flex">
        <button onClick={() => (HandleClickEvent())}
            className="mr-4">
            {isClient?(checked ? '✅' : '⬜'):'🔳'}
        </button>
        <div className="flex-1">
            <h3 className="my-2 text-lg"><div dangerouslySetInnerHTML={{ __html: item.title }} /></h3>
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