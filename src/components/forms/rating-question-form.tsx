"use client"

import { useState } from "react"

import { TQuestion } from "@/models/question"
import { QuestionForm } from "./question-form"
import { OpinionScaleQuestion } from "@/components/question-types/opinion-scale-question"

type RatingQuestionFormProps = {
    question: TQuestion
    onContinue: (value: string) => void
}

export function RatingQuestionForm({ question, onContinue }: RatingQuestionFormProps) {
    const [answer, setAnswer] = useState<string>("")

    const isValid = question.isRequired ? !!answer : true

    function handleSelect(value: string) {
        setAnswer(value == answer ? "" : value)
    }

    function handleSubmit() {
        if (!isValid) return

        onContinue(answer)
        setAnswer("")
    }

    return (
        <QuestionForm
            question={question}
            onSubmit={handleSubmit}
            isValid={isValid}
        >
            {question.type.slug == "opinionScale" && (
                <OpinionScaleQuestion
                    question={question}
                    onSelect={handleSelect}
                    selectedAnswer={answer}
                />
            )}
        </QuestionForm>
    )
}