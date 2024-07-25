"use client"

import { createRef, useEffect } from "react"
import { ArrowRight } from "lucide-react"

import { TQuestion } from "@/models/question"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useCreateForm } from "@/contexts/create-form-context"
import { InputQuestion } from "@/components/question-types/input-question"
import { TextareaQuestion } from "@/components/question-types/textarea-question"

type CreateQuestionFormProps = {
    question?: TQuestion
}

export function CreateQuestionForm({ question }: CreateQuestionFormProps) {
    const { selectedQuestion, updateQuestion } = useCreateForm()

    const titleInputRef = createRef<HTMLTextAreaElement>()
    const descriptionInputRef = createRef<HTMLTextAreaElement>()

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
        <div className="flex items-start gap-3 w-full max-w-[500px]">
            <div className="flex items-center gap-1 mt-0.5 text-[#0545AF]">
                <p className="font-medium tabular-nums">
                    {selectedQuestion && selectedQuestion.order + 1}
                </p>

                <ArrowRight
                    size={20}
                />
            </div>

            <div className="flex flex-col gap-4 w-full">
                <div className="space-y-2">
                    <Textarea
                        ref={titleInputRef}
                        placeholder="Your question here..."
                        className="p-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full h-7 min-h-7 font-medium text-xl resize-none"
                        value={selectedQuestion?.title}
                        onChange={e => {
                            updateQuestion({
                                ...selectedQuestion!,
                                title: e.target.value
                            })
                        }}
                        onInput={e => {
                            const textarea = e.currentTarget
                            textarea.style.height = "28px"
                            textarea.style.height = `${textarea.scrollHeight}px`
                        }}
                    />

                    <Textarea
                        ref={descriptionInputRef}
                        placeholder="Description (optional)"
                        className="p-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full h-6 min-h-6 text-base text-zinc-500 placeholder:text-zinc-500 resize-none"
                        value={selectedQuestion?.description}
                        onChange={e => {
                            updateQuestion({
                                ...selectedQuestion!,
                                description: e.target.value
                            })
                        }}
                        onInput={e => {
                            const textarea = e.currentTarget
                            textarea.style.height = "24px"
                            textarea.style.height = `${textarea.scrollHeight}px`
                        }}
                    />
                </div>

                <div className="space-y-2">
                    {(question?.type.category.slug == "input" || question?.type.slug == "shortText") && (
                        <InputQuestion question={question} />
                    )}

                    {question?.type.slug == "longText" && (
                        <TextareaQuestion />
                    )}
                    {question?.type.category.slug == "choice" && <p>choice</p>}
                    {question?.type.category.slug == "rating" && <p>rating</p>}
                </div>

                <Button className="px-8 w-fit">
                    {question?.buttonText ?? "Continue"}
                </Button>
            </div>
        </div>
    )
}