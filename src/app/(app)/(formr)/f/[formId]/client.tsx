"use client"

import { Form, Question } from "@prisma/client"

import { FormItem } from "@/components/form-item"
import { QUESTION_TYPES } from "@/data/types"
import { Alert, AlertDescription } from "@/components/ui/alert"

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
            {!form.isPublished && (
                <Alert className="top-10 left-1/2 absolute border-blue-500 w-fit text-blue-500 text-center -translate-x-[calc(50%)]">
                    <AlertDescription>
                        This form is not published and can&apos;t be accessed by 
                        others.
                    </AlertDescription>
                </Alert>
            )}

            <FormItem
                questions={questions}
            />
        </div>
    )
}