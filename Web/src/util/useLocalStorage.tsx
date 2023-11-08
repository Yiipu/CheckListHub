import { useState, useEffect } from 'react'

export default function useLocalStorage(key: string, initialValue: string) {
    const isBrowser = typeof window !== 'undefined'

    const [storedValue, setStoredValue] = useState(() => {
        if (isBrowser) {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : JSON.parse(initialValue)
        }
        return JSON.parse(initialValue)
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue))
    }, [key, storedValue])

    return [storedValue, setStoredValue]
}
