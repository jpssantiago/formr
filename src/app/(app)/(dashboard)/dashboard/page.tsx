import { getForms } from "@/actions/get-forms"
import { getFolders } from "@/actions/get-folders"
import { DashboardClientPage } from "./client"

export default async function DashboardPage() {
    const forms = await getForms()
    const folders = await getFolders()

    return (
        <div>
            {forms && folders ? (
                <DashboardClientPage
                    forms={forms}
                    folders={folders}
                />
            ) : (
                <h1>not available</h1>
            )}
        </div>
    )
}