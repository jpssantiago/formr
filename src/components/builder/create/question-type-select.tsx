"use client"

import { QUESTION_TYPES } from "@/data/types"
import { useFormBuilder } from "@/contexts/use-form-builder"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const types = QUESTION_TYPES.sort((b, a) => {
    if (a.category.slug < b.category.slug) {
        return -1
    }

    if (a.category.slug > b.category.slug) {
        return 1
    }

    return 0
})

export function QuestionTypeSelect() {
    const { selectedQuestion, updateQuestion } = useFormBuilder()

    return (
        <Select
            value={selectedQuestion?.type.slug}
            onValueChange={slug => {
                updateQuestion({
                    ...selectedQuestion!,
                    type: QUESTION_TYPES.find(type => type.slug == slug)!,
                    minValue: undefined,
                    maxValue: undefined,
                    leftPlaceholder: undefined,
                    rightPlaceholder: undefined,
                    mask: undefined
                })
            }}
        >
            <SelectTrigger>
                <SelectValue>
                    <div className="flex items-center gap-3 text-sm">
                        <div className={cn("p-1.5 rounded-lg", selectedQuestion?.type.category.color)}>
                            {selectedQuestion && <selectedQuestion.type.icon size={16} />}
                        </div>

                        {selectedQuestion?.type.name}
                    </div>
                </SelectValue>
            </SelectTrigger>

            <SelectContent>
                {types.map(type => (
                    <SelectItem key={type.slug} value={type.slug} className="p-2 [&_.select-check]:hidden">
                        <div className="flex items-center gap-3 text-sm">
                            <div className={cn("p-1.5 rounded-lg", type.category.color)}>
                                {<type.icon size={16} />}
                            </div>

                            {type.name}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}