"use client"

import { ReactNode, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { LoadingContainer } from "@/components/loading-container"

type DashboardLayoutProps = {
    children?: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { status, data } = useSession()
    const { push } = useRouter()

    useEffect(() => {
        if (status == "unauthenticated") {
            return push("/auth")
        }
    }, [status])

    return (
        <div className="h-screen">
            {status == "loading" && <LoadingContainer />}

            {data && children}
        </div>
    )
}