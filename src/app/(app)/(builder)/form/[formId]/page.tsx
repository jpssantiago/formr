import { redirect } from "next/navigation"

export default function FormPage({ params }: { params: { formId: string } }) {
    return redirect(`/form/${params.formId}/create`)
}