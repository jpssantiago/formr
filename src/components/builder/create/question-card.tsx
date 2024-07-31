"use client"

import { createRef, useEffect } from "react"
import { ArrowRight, Copy, Settings, Trash2 } from "lucide-react"

import { TQuestion } from "@/models/question"
import { useCreateForm } from "@/contexts/create-form-context"
import { TextIconButton } from "@/components/ui/text-icon-button"
import { QuestionTypeBadge } from "@/components/question-type-badge"
import { Separator } from "@/components/ui/separator"
import { InputQuestion } from "@/components/question-types/input-question"
import { TextareaQuestion } from "@/components/question-types/textarea-question"
import { Textarea } from "@/components/ui/textarea"
import { QuestionSettingsSheet } from "./question-settings-sheet"

type QuestionCardProps = {
    question: TQuestion
}

export function QuestionCard({ question }: QuestionCardProps) {
    const { duplicateQuestion, questions, deleteQuestion, updateQuestion } = useCreateForm()

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
    }, [])

    function onDuplicate() {
        duplicateQuestion(question)
    }

    function onDelete() {
        if (questions.length == 1) return

        deleteQuestion(question)
    }

    return (
        <div className="flex flex-col shadow-lg border rounded-lg">
            <div className="flex items-start gap-3 p-3">
                <div className="flex items-center gap-1 mt-0.5 text-[#0545AF]">
                    <p className="font-medium tabular-nums">
                        {question.order + 1}
                    </p>

                    <ArrowRight
                        size={20}
                    />
                </div>

                <div className="space-y-4 pr-10 w-full text-start">
                    <div className="space-y-1">
                        <Textarea
                            ref={titleInputRef}
                            placeholder="Your question here..."
                            className="p-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full h-7 min-h-7 font-medium text-xl resize-none"
                            value={question.title}
                            onChange={e => {
                                updateQuestion({
                                    ...question!,
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
                            value={question.description}
                            onChange={e => {
                                updateQuestion({
                                    ...question!,
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

                    <div className="space-y-2 w-full">
                        {(question?.type.category.slug == "input" || question?.type.slug == "shortText") && (
                            <InputQuestion question={question} />
                        )}

                        {question?.type.slug == "longText" && (
                            <TextareaQuestion />
                        )}
                        {question?.type.category.slug == "choice" && <p>choice</p>}
                        {question?.type.category.slug == "rating" && <p>rating</p>}
                    </div>
                </div>

                <QuestionSettingsSheet question={question}>
                    <Settings
                        size={20}
                        className="mt-1 text-zinc-600 hover:text-black"
                    />
                </QuestionSettingsSheet>
            </div>

            <Separator className="mt-2" />

            <div className="flex justify-between items-center bg-zinc-100 px-3 py-1">
                <QuestionTypeBadge question={question} />

                <div className="flex items-center gap-2">
                    <TextIconButton
                        icon={Copy}
                        iconSize={18}
                        variant="ghost"
                        className="hover:bg-zinc-200 text-zinc-600 hover:text-black"
                        onClick={onDuplicate}
                    >
                        Duplicate
                    </TextIconButton>

                    <TextIconButton
                        icon={Trash2}
                        iconSize={18}
                        variant="ghost"
                        className="hover:bg-zinc-200 text-zinc-600 hover:text-black"
                        onClick={onDelete}
                        disabled={questions.length == 1}
                    >
                        Delete
                    </TextIconButton>
                </div>
            </div>
        </div>
    )
}