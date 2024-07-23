"use client"

import { useState } from "react"
import { CaseSensitive, EllipsisVertical } from "lucide-react"

import { Question } from "@/models/question"
import { cn } from "@/lib/utils"
import { QuestionListItemPopover } from "./question-list-item-popover"

type QuestionListItemProps = {
    question: Question
    onSelect: () => void
    isSelected: boolean
}

export function QuestionListItem({ question, onSelect, isSelected }: QuestionListItemProps) {
    const [show, setShow] = useState<boolean>(false)

    return (
        <div
            onClick={onSelect}
            className={cn(`group gap-3 flex justify-between items-center hover:bg-zinc-200 px-3 rounded-lg h-12 transition-all cursor-pointer`, isSelected && "bg-zinc-200")}
        >
            <div className="flex items-center gap-3 overflow-hidden">
                <div className={cn("flex items-center gap-3 bg-blue-500/30 px-2 py-1 rounded-md", question.type.category.color)}>
                    {<question.type.icon size={16} />}

                    <p className="text-sm truncate">
                        {question.order + 1}
                    </p>
                </div>

                <p className="text-sm text-zinc-600 truncate">
                    {question.title || "..."}
                </p>
            </div>

            <div onClick={e => e.stopPropagation()}>
                <QuestionListItemPopover question={question} show={show} setShow={setShow}>
                    <div className={cn("group-hover:flex justify-between items-center hidden bg-zinc-300 p-1 rounded-full", show && "flex")}>
                        <EllipsisVertical
                            size={16}
                        />
                    </div>
                </QuestionListItemPopover>
            </div>
        </div>
    )
}