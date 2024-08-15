"use client"

import { useCreateForm } from "@/contexts/create-form-context"
import { QuestionCard } from "./question-card"

export function QuestionCardList() {
    const { questions } = useCreateForm()

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