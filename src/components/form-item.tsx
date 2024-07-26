"use client"

import { useState } from "react"

import { TQuestion } from "@/models/question"
import { InputQuestionForm } from "./forms/input-question-form"

type FormItemProps = {
    questions: TQuestion[]
}

export function FormItem({ questions }: FormItemProps) {
    const [currentQuestion, setCurrentQuestion] = useState<TQuestion>(questions[0])
    
    function handleContinue() {
        if (currentQuestion.order < questions.length - 1) {
            setCurrentQuestion(questions[currentQuestion.order + 1])
        } else {
            alert("finish")
        }
    }

    return (
        <div className="h-full">
            {(["input", "text"].includes(currentQuestion.type.category.slug)) && (
                <InputQuestionForm
                    question={currentQuestion}
                    onContinue={handleContinue}
                />
            )}
        </div>
    )
}