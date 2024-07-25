"use client"

import { ReactNode, useEffect } from "react"

import { Form, Question } from "@prisma/client"
import { TForm } from "@/models/form"
import { useCreateForm } from "@/contexts/create-form-context"
import { TopBar } from "@/components/form-page/top-bar/top-bar"
import { QUESTION_TYPES } from "@/data/types"

type FormPageClientLayoutProps = {
    form: Form
    children: ReactNode
}

export default function FormPageClientLayout({ form, children }: FormPageClientLayoutProps) {
    const { loadForm } = useCreateForm()

    useEffect(() => {
        loadForm({
            ...form,
            questions: (form as any).questions.map((question: Question) => {
                return {
                    ...question,
                    type: QUESTION_TYPES.find(type => type.slug == question.type)
                }
            })
        } as TForm)
    }, [])

    return (
        <div className="flex flex-col gap-5 px-5 py-1 h-dvh">
            <TopBar formId={form.id} />

            {children}
        </div>
    )
}