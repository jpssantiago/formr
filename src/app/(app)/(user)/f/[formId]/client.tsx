"use client"

import { Form, Question } from "@prisma/client"
import { FormItem } from "@/components/form-item"
import { QUESTION_TYPES } from "@/data/types"

type FormClientPageProps = {
    form: Form
}

export function FormClientPage({ form }: FormClientPageProps) {
    const questions = (form as any).questions.map((question: Question) => {
        return {
            ...question,
            type: QUESTION_TYPES.find(type => type.slug == question.type)
        }
    })

    return (
        <div className="h-dvh">
            <FormItem
                questions={questions}
            />
        </div>
    )
}