"use client"

import { ReactNode, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { LoadingContainer } from "@/components/loading-container"
import { NavBar } from "@/components/nav-bar"

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
        <div className="h-dvh">
            {status == "loading" && <LoadingContainer />}

            {data && (
                <div className="flex tablet:flex-col">
                    <NavBar />

                    <div className="p-5">
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}