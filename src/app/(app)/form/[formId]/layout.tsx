import { ReactNode } from "react"
import { redirect } from "next/navigation"

import { getForm } from "@/actions/get-form"
import { TopBar } from "@/components/form-page/top-bar/top-bar"

type FormPageLayoutProps = {
    children: ReactNode
    params: {
        formId: string
    }
}

export default async function FormPageLayout({ children, params }: FormPageLayoutProps) {
    const form = await getForm(params.formId)

    if (!form) {
        return redirect("/dashboard")
    }

    return (
        <div className="flex flex-col gap-5 px-5 py-1 h-dvh">
            <TopBar formId={params.formId} />

            {children}
        </div>

    )
}