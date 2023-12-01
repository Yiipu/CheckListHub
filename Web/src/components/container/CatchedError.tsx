'use client'
import { useEffect } from "react"

export default function CatchedError({
    error
}: {
    error?: Error
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='text-center h-full'>
            <h2>Something went wrong!</h2>
        </div>
    )
}