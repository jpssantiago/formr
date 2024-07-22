"use client"

import { useCreateForm } from "@/contexts/create-form-context"
import { QuestionListItem } from "./question-list-item"

export function QuestionList() {
    const { questions, selectedQuestion, selectQuestion } = useCreateForm()

    return (
        <div className="space-y-1 bg-zinc-100 bg-scroll custom-scroll p-3 rounded-lg w-80 h-full overflow-y-scroll">
            {questions.map((question) => (
                <QuestionListItem
                    key={question.id}
                    question={question}
                    onSelect={() => selectQuestion(question)}
                    isSelected={selectedQuestion?.id == question.id}
                />
            ))}
        </div>
    )
}