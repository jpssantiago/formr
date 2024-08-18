"use client"

import { Reorder } from "framer-motion"

import { useFormBuilder } from "@/contexts/use-form-builder"
import { QuestionListItem } from "./question-list-item"

export function QuestionList() {
    const { questions, selectedQuestion, selectQuestion, reorderQuestions } = useFormBuilder()

    return (
        <div className="space-y-1 large:hidden bg-zinc-100 bg-scroll custom-scroll p-3 rounded-lg w-60 h-full overflow-y-auto">
            <Reorder.Group
                values={questions}
                onReorder={reorderQuestions}
                axis="y"
            >
                {questions.map((question) => (
                    <Reorder.Item
                        key={question.id}
                        value={question}
                        className="relative z-50 py-1"
                        onDragStart={() => selectQuestion(question)}
                    >
                        <QuestionListItem
                            key={question.id}
                            question={question}
                            onSelect={() => selectQuestion(question)}
                            isSelected={selectedQuestion?.id == question.id}
                        />
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    )
}