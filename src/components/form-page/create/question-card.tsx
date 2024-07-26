"use client"

import { ArrowRight, Copy, Trash2 } from "lucide-react"

import { TQuestion } from "@/models/question"
import { useCreateForm } from "@/contexts/create-form-context"
import { IconButton } from "@/components/ui/icon-button"
import { QuestionTypeBadge } from "@/components/question-type-badge"
import { Separator } from "@/components/ui/separator"
import { InputQuestion } from "@/components/question-types/input-question"
import { TextareaQuestion } from "@/components/question-types/textarea-question"
import { CreateQuestionDialog } from "./create-question-dialog"

type QuestionCardProps = {
    question: TQuestion
}

export function QuestionCard({ question }: QuestionCardProps) {
    const { duplicateQuestion, questions, deleteQuestion } = useCreateForm()

    function onDuplicate() {
        duplicateQuestion(question)
    }

    function onDelete() {
        if (questions.length == 1) return

        deleteQuestion(question)
    }

    return (
        <div className="flex flex-col shadow-lg border rounded-lg">
            <CreateQuestionDialog>
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
                            <h1 className="font-medium text-lg">
                                {question.title || "..."}
                            </h1>

                            <p className="text-zinc-600">
                                {question.description || "Description (optional)"}
                            </p>
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
                </div>
            </CreateQuestionDialog>

            <Separator className="mt-2" />

            <div className="flex justify-between items-center bg-zinc-100 px-3 py-1">
                <QuestionTypeBadge question={question} />

                <div className="flex items-center gap-2">
                    <IconButton
                        icon={Copy}
                        iconSize={18}
                        variant="ghost"
                        className="hover:bg-zinc-200 text-zinc-600 hover:text-black"
                        onClick={onDuplicate}
                    >
                        Duplicate
                    </IconButton>

                    <IconButton
                        icon={Trash2}
                        iconSize={18}
                        variant="ghost"
                        className="hover:bg-zinc-200 text-zinc-600 hover:text-black"
                        onClick={onDelete}
                        disabled={questions.length == 1}
                    >
                        Delete
                    </IconButton>
                </div>
            </div>
        </div>
    )
}