"use client"

import { ArrowRight } from "lucide-react"

import { Question } from "@/models/question"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useCreateForm } from "@/contexts/create-form-context"

type CreateQuestionFormProps = {
    question: Question
}

export function CreateQuestionForm({ question }: CreateQuestionFormProps) {
    const { selectedQuestion, updateQuestion } = useCreateForm()

    return (
        <div className="flex items-start gap-2 w-full max-w-[500px]">
            <div className="flex items-center gap-2 mt-0.5 text-blue-500">
                <p className="font-medium tabular-nums">
                    {selectedQuestion.order + 1}
                </p>

                <ArrowRight
                    size={20}
                />
            </div>

            <div className="flex flex-col gap-4 w-full">
                <div className="space-y-2">
                    <Textarea
                        placeholder="Question goes here..."
                        className="p-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full h-7 min-h-7 font-medium text-xl resize-none"
                        value={selectedQuestion.title}
                        onChange={e => {
                            updateQuestion({
                                ...selectedQuestion,
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
                        placeholder="Description (optional)"
                        className="p-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full h-6 min-h-6 text-base text-zinc-500 placeholder:text-zinc-500 resize-none"
                        value={selectedQuestion.description}
                        onChange={e => {
                            updateQuestion({
                                ...selectedQuestion,
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

                <div>
                    options
                </div>

                <Button className="px-8 w-fit">
                    {question.buttonText ?? "Continue"}
                </Button>
            </div>
        </div>
    )
}