'use client'
import { useSearchParams } from "next/navigation"

export default function Home() {
    const params = useSearchParams()

    return (
        <div>
            <h1>Page {params.getAll("firebase_id")}</h1>
        </div>
    )
}