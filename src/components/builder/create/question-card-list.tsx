"use client"

import { Reorder } from "framer-motion"

import { useFormBuilder } from "@/contexts/use-form-builder"
import { QuestionCard } from "./question-card"

export function QuestionCardList() {
    const { questions, reorderQuestions } = useFormBuilder()

    return (
        <Reorder.Group
            values={questions}
            onReorder={reorderQuestions}
            axis="y"
            className="overflow-y-hidden"
            layoutScroll
        >
            <div className="flex flex-col gap-5 h-full overflow-y-scroll select-none">
                {questions.map(question => (
                    <QuestionCard
                        key={question.id}
                        question={question}
                    />
                ))}
            </div>
        </Reorder.Group>
    )
}