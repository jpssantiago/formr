import { ReactNode } from "react"

import { TQuestion } from "@/models/question"
import { LoadingButton } from "@/components/ui/loading-button"

type QuestionFormProps = {
    question: TQuestion
    onSubmit: any
    isLoading: boolean
    isValid: boolean
    children: ReactNode
}

export function QuestionForm({ question, onSubmit, isLoading, isValid, children }: QuestionFormProps) {
    return (
        <form 
            className="space-y-4 w-full"
            onSubmit={onSubmit}
        >
            {children}

            <LoadingButton loading={isLoading} disabled={!isValid} className="bg-blue-500 hover:bg-blue-600 px-8">
                {question.buttonText}
            </LoadingButton>
        </form>
    )
}