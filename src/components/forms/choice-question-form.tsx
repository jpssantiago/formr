"use client"

import { useState } from "react"

import { TQuestion } from "@/models/question"
import { QuestionForm } from "./question-form"
import { YesNoQuestion } from "@/components/question-types/yes-no-question"

type ChoiceQuestionFormProps = {
    question: TQuestion
    onContinue: (value: string) => void
}

export function ChoiceQuestionForm({ question, onContinue }: ChoiceQuestionFormProps) {
    const [answer, setAnswer] = useState<string>()

    function handleSubmit() {
        if (!answer) return

        onContinue(answer)
        setAnswer("")
    }

    return (
        <QuestionForm
            question={question}
            onSubmit={handleSubmit}
            isValid={!!answer}
        >
            {question.type.slug == "yesNo" && (
                <YesNoQuestion
                    question={question}
                    onSelect={value => setAnswer(value == answer ? "" : value)}
                    selectedAnswer={answer}
                />
            )}
        </QuestionForm>
    )
}