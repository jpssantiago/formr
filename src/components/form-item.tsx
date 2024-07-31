"use client"

import { useState } from "react"

import { TQuestion } from "@/models/question"
import { InputQuestionForm } from "./forms/input-question-form"

type FormItemProps = {
    questions: TQuestion[]
    mode?: "submit" | "preview"
    previewMode?: "desktop" | "mobile"
}

export function FormItem({ questions, mode = "submit" }: FormItemProps) {
    const [currentQuestion, setCurrentQuestion] = useState<TQuestion>(questions[0])
    const [answers, setAnswers] = useState<any[]>([])
    const [isFinished, setIsFinished] = useState<boolean>(false)

    function handleContinue(value: string | number) {
        setAnswers([...answers, value])

        if (currentQuestion.order < questions.length - 1) {
            setCurrentQuestion(questions[currentQuestion.order + 1])
        } else {
            setIsFinished(true)
            // TODO: Save the answers
        } 
    }

    return (
        <div className="flex items-center mx-auto px-5 max-w-[500px] h-full transition-all">
            {isFinished ? (
                <pre className="flex justify-center w-full">
                    <code>
                        {JSON.stringify(answers)}
                    </code>
                </pre>
            ) : (
                (["input", "text"].includes(currentQuestion.type.category.slug)) && (
                    <InputQuestionForm
                        question={currentQuestion}
                        onContinue={handleContinue}
                    />
                )
            )}
        </div>
    )
}