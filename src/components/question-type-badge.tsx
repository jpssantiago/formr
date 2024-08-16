"use client"

import { TQuestion } from "@/models/question"
import { useCreateForm } from "@/contexts/create-form-context"
import { cn } from "@/lib/utils"

type QuestionBadgeProps = {
    question: TQuestion
}
export function QuestionTypeBadge({ question }: QuestionBadgeProps) {
    const { questions } = useCreateForm()

    return (
        <div className={cn("flex items-center gap-3 bg-blue-500/30 px-2 py-1 rounded-md", question.type.category.color)}>
            {<question.type.icon size={16} />}

            <p className="text-sm truncate">
                {questions.findIndex(q => q.id == question.id) + 1}
            </p>
        </div>
    )
}