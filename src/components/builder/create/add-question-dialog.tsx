"use client"

import { ReactNode } from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { QUESTION_TYPES_CATEGORIES } from "@/data/categories"
import { QUESTION_TYPES } from "@/data/types"
import { QuestionTypeItem } from "./question-type-item"

export function AddQuestionDialog({ children }: { children: ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span>
                    {children}
                </span>
            </DialogTrigger>

            <DialogContent className="space-y-4">
                <DialogHeader className="items-start text-start">
                    <DialogTitle>Create a new question</DialogTitle>

                    <DialogDescription>
                        Choose an option below.
                    </DialogDescription>
                </DialogHeader>

                <div className="gap-x-10 gap-y-4 grid grid-cols-2">
                    {QUESTION_TYPES_CATEGORIES.map(category => (
                        <div key={category.slug} className="space-y-2">
                            <span className="font-medium">
                                {category.name}
                            </span>

                            {QUESTION_TYPES.map(type => type.category.slug == category.slug && (
                                <QuestionTypeItem
                                    key={type.slug}
                                    type={type}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}