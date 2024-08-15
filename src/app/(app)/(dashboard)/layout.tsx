import { ReactNode } from "react"
import { redirect } from "next/navigation"

import { getUser } from "@/actions/get-user"
import { NavBar } from "@/components/nav-bar/nav-bar"

type DashboardLayoutProps = {
    children: ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    const user = await getUser()

    if (!user) {
        return redirect("/auth")
    }

    return (
        <div className="flex navbar:flex-col">
            <NavBar />

            <div className="p-10 w-full overflow-y-hidden">
                {children}
            </div>
        </div>
    )
}