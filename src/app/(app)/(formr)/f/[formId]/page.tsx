import { redirect } from "next/navigation"

import { getForm } from "@/actions/get-form"
import { getUser } from "@/actions/get-user"
import { FormClientPage } from "./client"

export default async function UserFormPage({ params }: { params: { formId: string } }) {
    const form = await getForm(params.formId)
    const user = await getUser()

    if (!form) {
        return redirect("/404")
    }

    if (!form.isPublished && user?.id != form.authorId) {
        return redirect("/404")
    }

    return (
        <FormClientPage
            form={form}
        />
    )
}