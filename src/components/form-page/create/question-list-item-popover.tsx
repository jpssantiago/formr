"use client"

import { ReactNode } from "react"
import { Copy, Trash2 } from "lucide-react"

import { TQuestion } from "@/models/question"
import { useCreateForm } from "@/contexts/create-form-context"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverItem, PopoverItemIcon, PopoverItemText } from "@/components/ui/popover-item"

type QuestionListItemPopoverProps = {
    question: TQuestion
    show: boolean
    setShow: (show: boolean) => void
    children: ReactNode
}

export function QuestionListItemPopover({ question, children, show, setShow }: QuestionListItemPopoverProps) {
    const { duplicateQuestion, deleteQuestion, questions } = useCreateForm()

    function onDuplicate() {
        duplicateQuestion(question)
    }

    function onDelete() {
        deleteQuestion(question)
    }
    
    return (
        <Popover open={show} onOpenChange={setShow}>
            <PopoverTrigger>
                {children}
            </PopoverTrigger>

            <PopoverContent className="space-y-1 p-1 w-44">
                <PopoverItem onClick={onDuplicate}>
                    <PopoverItemIcon icon={Copy} />
                    <PopoverItemText>Duplicate</PopoverItemText>
                </PopoverItem>

                {questions.length > 1 && (
                    <PopoverItem variant="destructive" onClick={onDelete}>
                        <PopoverItemIcon icon={Trash2} />
                        <PopoverItemText>Delete</PopoverItemText>
                    </PopoverItem>
                )}
            </PopoverContent>
        </Popover>
    )
}