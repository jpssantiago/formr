"use client"

import { useCreateForm } from "@/contexts/create-form-context"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function OpinionScaleOptions() {
    return (
        <div className="space-y-2">
            <div className="flex items-center gap-3">
                <MinValueSelect />

                <p className="text-sm text-zinc-600">
                    to
                </p>

                <MaxValueSelect />
            </div>
        </div>
    )
}

export function MinValueSelect() {
    const { selectedQuestion, updateQuestion } = useCreateForm()

    const minValue = (selectedQuestion?.minValue ?? 0).toString()

    return (
        <Select 
            value={minValue}
            onValueChange={value => {
                updateQuestion({
                    ...selectedQuestion!,
                    minValue: Number(value),
                    maxValue: selectedQuestion?.maxValue == Number(value) ? selectedQuestion.maxValue + 1 : selectedQuestion?.maxValue
                })
            }}
        >
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1">1</SelectItem>
            </SelectContent>
        </Select>
    )
}

export function MaxValueSelect() {
    const { selectedQuestion, updateQuestion } = useCreateForm()

    const maxValue = (selectedQuestion?.maxValue ?? 10).toString()

    return (
        <Select
            value={maxValue}
            onValueChange={value => {
                updateQuestion({
                    ...selectedQuestion!,
                    maxValue: Number(value)
                })
            }}
        >
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                {Array.from({ length: 10 - (selectedQuestion?.minValue ?? 0) }).map((_, index) => {
                    const value = index + 1 + (selectedQuestion?.minValue ?? 0)

                    return (
                        <SelectItem key={index} value={value.toString()}>
                            {value}
                        </SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}