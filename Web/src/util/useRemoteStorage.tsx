import { useState, useEffect } from 'react'

export default function useRemoteStorage(key: string, initialValue: string) {

    const [storedValue, setStoredValue] = useState(() => {
        const item = RemoteStorage.getItem(key)
        return item ? JSON.parse(item) : JSON.parse(initialValue)
    })

    useEffect(() => {
        RemoteStorage.setItem(key, JSON.stringify(storedValue))
    }, [key, storedValue])

    return [storedValue, setStoredValue]
}

