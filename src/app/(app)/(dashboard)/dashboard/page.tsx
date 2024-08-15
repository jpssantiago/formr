import { redirect } from "next/navigation"

import { getForms } from "@/actions/get-forms"
import { getFolders } from "@/actions/get-folders"
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header"
import { Separator } from "@/components/ui/separator"
import { DashboardClientPage } from "./client"

export default async function DashboardPage() {
    const forms = await getForms()
    const folders = await getFolders()

    if (!forms || !folders) {
        return redirect("/auth")
    }

    return (
        <div className="flex flex-col gap-5">
            <DashboardPageHeader folders={folders} />

            <Separator className="mt-5" />

            <DashboardClientPage 
                forms={forms}
                folders={folders}
            />
        </div>
    )
}