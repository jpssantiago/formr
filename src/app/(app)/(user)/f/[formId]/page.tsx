import { redirect } from "next/navigation"

import { getForm } from "@/actions/get-form"
import { FormClientPage } from "./client"

export default async function UserFormPage({ params }: { params: { formId: string } }) {
    const form = await getForm(params.formId)

    if (!form) {
        redirect("/err")
    }

    if (!form.isPublished) {
        redirect("/private-form")
    }

    return (
        <FormClientPage
            form={form}
        />
    )
}