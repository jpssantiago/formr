"use client"

import { createRef, useEffect } from "react"
import { Copy, Settings, Trash2 } from "lucide-react"

import { TQuestion } from "@/models/question"
import { useCreateForm } from "@/contexts/create-form-context"
import { TextIconButton } from "@/components/ui/text-icon-button"
import { QuestionTypeBadge } from "@/components/question-type-badge"
import { Separator } from "@/components/ui/separator"
import { QuestionSettingsSheet } from "./question-settings-sheet"
import { CreateQuestionForm } from "@/components/create-question-form"

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
            <div className="flex justify-between items-start gap-3 p-3">
                <CreateQuestionForm
                    question={question}
                    mode="mobile"
                />

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