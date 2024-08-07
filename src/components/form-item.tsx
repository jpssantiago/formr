"use client"

import { useState } from "react"

import { TQuestion } from "@/models/question"
import { InputQuestionForm } from "./forms/input-question-form"

type FormItemProps = {
    questions: TQuestion[]
    mode?: "submit" | "preview"
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
        <div className="flex items-center mx-auto px-5 w-full max-w-[500px] h-full transition-all">
            {isFinished ? (
                <pre className="flex justify-center w-full">
                    <code>
                        {JSON.stringify(answers)}
                    </code>
                </pre>
            ) : (
                <div className="flex flex-col gap-4 w-full">
                    <div className="space-y-1">
                        <p className="text-[15px] text-zinc-600">
                            Question {currentQuestion.order + 1} of {questions.length}
                        </p>

                        <h1 className="font-medium text-xl">
                            {currentQuestion.title || "This question has no title."}
                            {!currentQuestion.isRequired && (" (optional)")}
                        </h1>
                    </div>

                    <div className="space-y-2 w-full">
                        {(["input", "text"].includes(currentQuestion.type.category.slug)) && (
                            <InputQuestionForm
                                question={currentQuestion}
                                onContinue={handleContinue}
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}