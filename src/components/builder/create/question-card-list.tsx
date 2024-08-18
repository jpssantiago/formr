"use client"

import { useFormBuilder } from "@/contexts/use-form-builder"
import { QuestionCard } from "./question-card"

export function QuestionCardList() {
    const { questions } = useFormBuilder()

    return (
        <div className="flex flex-col gap-5 h-full overflow-y-scroll">
            {questions.map(question => (
                <QuestionCard
                    key={question.id}
                    question={question}
                />
            ))}
        </div>
    )
}