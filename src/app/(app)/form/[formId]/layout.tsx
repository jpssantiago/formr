import { ReactNode } from "react"
import { redirect } from "next/navigation"

import { getForm } from "@/actions/get-form"
import { TForm } from "@/models/form"
import FormPageClientLayout from "./client"

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
        <FormPageClientLayout form={(form as any)}>
            {children}
        </FormPageClientLayout>
    )
}