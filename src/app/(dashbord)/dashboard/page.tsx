"use client"

import { useSession, signOut } from "next-auth/react"

export default function DashboardPage() {
    const { data: session } = useSession()

    return (
        <div>
            <div className="flex flex-col">
                <pre>
                    {JSON.stringify(session)}
                </pre>

                <button onClick={() => {
                    signOut()
                }}>Sign out</button>
            </div>
        </div>
    )
}