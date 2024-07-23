"use client"

import { QuestionType } from "@/models/question-type"
import { useCreateForm } from "@/contexts/create-form-context"
import { cn } from "@/lib/utils"
import { DialogClose } from "@/components/ui/dialog"

export function QuestionTypeItem({ type }: { type: QuestionType }) {
    const { addQuestion } = useCreateForm()

    function onClick() {
        addQuestion(type)
    }

    return (
        <DialogClose asChild>
            <div onClick={onClick} key={type.slug} className="flex items-center gap-3 hover:bg-zinc-100 px-2 rounded-lg h-10 -translate-x-2 cursor-pointer">
                <div className={cn("flex justify-center items-center p-1.5 rounded-lg", type.category.color)}>
                    {<type.icon size={16} />}
                </div>

                <p className="text-sm text-zinc-600">
                    {type.name}
                </p>
            </div>
        </DialogClose>
    )
}