"use client"

import { createRef, useEffect } from "react"

import { TQuestion } from "@/models/question"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useCreateForm } from "@/contexts/create-form-context"
import { InputQuestion } from "./question-types/input-question"
import { TextAreaQuestion } from "./question-types/text-area-question"

type CreateQuestionFormProps = {
    question?: TQuestion
    mode?: "desktop" | "mobile"
}

export function CreateQuestionForm({ question, mode = "desktop" }: CreateQuestionFormProps) {
    const { selectedQuestion, updateQuestion, questions } = useCreateForm()

    const titleInputRef = createRef<HTMLTextAreaElement>()
    const descriptionInputRef = createRef<HTMLTextAreaElement>()

    const activeQuestion = question ? question : selectedQuestion

    useEffect(() => {
        if (titleInputRef.current) {
            titleInputRef.current.style.height = "28px"
            titleInputRef.current.style.height = `${titleInputRef.current.scrollHeight}px`
        }

        if (descriptionInputRef.current) {
            descriptionInputRef.current.style.height = "24px"
            descriptionInputRef.current.style.height = `${descriptionInputRef.current.scrollHeight}px`
        }
    }, [selectedQuestion])

    return (
        <div className="flex flex-col items-start gap-4 w-full max-w-[400px]">
            <div className="space-y-1 w-full">
                <p className="text-[15px] text-zinc-600">
                    Question {(activeQuestion?.order ?? 0) + 1} of {questions.length}
                </p>

                <Textarea
                    ref={titleInputRef}
                    placeholder="Your question here..."
                    className="p-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full h-7 min-h-7 font-medium text-lg resize-none"
                    value={activeQuestion?.title}
                    onChange={e => {
                        updateQuestion({
                            ...activeQuestion!,
                            title: e.target.value
                        })
                    }}
                    onInput={e => {
                        const textarea = e.currentTarget
                        textarea.style.height = "28px"
                        textarea.style.height = `${textarea.scrollHeight}px`
                    }}
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                {(activeQuestion?.type.category.slug == "input" || activeQuestion?.type.slug == "shortText") && (
                    <InputQuestion
                        question={activeQuestion}
                        readOnly
                    />
                )}

                {activeQuestion?.type.slug == "longText" && (
                    <TextAreaQuestion
                        readOnly
                    />
                )}

                {activeQuestion?.type.category.slug == "choice" && <p>choice</p>}
                
                {activeQuestion?.type.category.slug == "rating" && <p>rating</p>}
            </div>

            {mode == "desktop" && (
                <Button className="bg-blue-500 hover:bg-blue-600 px-8">
                    {activeQuestion?.buttonText ?? "Continue"}
                </Button>
            )}
        </div>
    )
}