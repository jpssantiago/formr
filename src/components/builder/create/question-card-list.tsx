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
        >
            <div className="flex flex-col gap-5 h-full overflow-y-scroll">
                {questions.map(question => (
                    <Reorder.Item
                        key={question.id}
                        value={question}
                        className="relative z-50"
                    >
                        <QuestionCard
                            key={question.id}
                            question={question}
                        />
                    </Reorder.Item>
                ))}
            </div>
        </Reorder.Group>
    )
}