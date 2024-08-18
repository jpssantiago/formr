"use client"

import { useFormBuilder } from "@/contexts/use-form-builder"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LabelInput } from "@/components/ui/label-input"

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

            <LeftLabelInput />

            <RightLabelInput />
        </div>
    )
}

export function MinValueSelect() {
    const { selectedQuestion, updateQuestion } = useFormBuilder()

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
    const { selectedQuestion, updateQuestion } = useFormBuilder()

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

export function LeftLabelInput() {
    const { selectedQuestion, updateQuestion } = useFormBuilder()

    return (
        <LabelInput
            label="Left label"
            placeholder="Not likely at all"
            value={selectedQuestion?.leftPlaceholder ?? "Not likely at all"}
            onChange={e => {
                updateQuestion({
                    ...selectedQuestion!,
                    leftPlaceholder: e.target.value
                })
            }}
        />
    )
}

export function RightLabelInput() {
    const { selectedQuestion, updateQuestion } = useFormBuilder()

    return (
        <LabelInput
            label="Right label"
            placeholder="Extremelly likely"
            value={selectedQuestion?.rightPlaceholder ?? "Extremely likely"}
            onChange={e => {
                updateQuestion({
                    ...selectedQuestion!,
                    rightPlaceholder: e.target.value
                })
            }}
        />
    )
}