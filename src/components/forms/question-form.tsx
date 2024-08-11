import { ReactNode } from "react"

import { TQuestion } from "@/models/question"
import { Button } from "@/components/ui/button"

type QuestionFormProps = {
    question: TQuestion
    onSubmit: any
    isValid: boolean
    children: ReactNode
}

export function QuestionForm({ question, onSubmit, isValid, children }: QuestionFormProps) {
    return (
        <form 
            className="space-y-4 w-full"
            onSubmit={onSubmit}
        >
            {children}

            <Button disabled={!isValid} className="bg-blue-500 hover:bg-blue-600 px-8">
                {question.buttonText}
            </Button>
        </form>
    )
}