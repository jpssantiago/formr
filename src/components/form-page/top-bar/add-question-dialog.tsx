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
import { CATEGORY_LIST } from "@/_data/categories"
import { TYPE_LIST } from "@/_data/types"
import { QuestionTypeItem } from "./question-type-item"

export function AddQuestionDialog({ children }: { children: ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="space-y-4">
                <DialogHeader className="items-start text-start">
                    <DialogTitle>Create a new question</DialogTitle>

                    <DialogDescription>
                        Choose an option below.
                    </DialogDescription>
                </DialogHeader>

                <div className="gap-x-10 gap-y-4 grid grid-cols-2">
                    {CATEGORY_LIST.map(category => (
                        <div key={category.slug} className="space-y-2">
                            <span className="font-medium">
                                {category.name}
                            </span>

                            {TYPE_LIST.map(type => type.category.slug == category.slug && (
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