"use client"

import { useCreateForm } from "@/contexts/create-form-context"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"

export function MinMaxValueOption() {
    const { selectedQuestion, updateQuestion } = useCreateForm()

    const hasMin = !!selectedQuestion.minValue
    const hasMax = !!selectedQuestion.maxValue

    return (
        <>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="minNumber" className="font-normal text-sm">
                        Min {selectedQuestion.type.slug == "number" ? "number" : "characters"}
                    </Label>

                    <Switch
                        id="minValue"
                        checked={hasMin}
                        onCheckedChange={() => {
                            updateQuestion({
                                ...selectedQuestion,
                                minValue: hasMin ? undefined : 1
                            })
                        }}
                    />
                </div>

                {hasMin && (
                    <Input
                        placeholder="Min number"
                        type="number"
                        value={selectedQuestion.minValue}
                        onChange={e => {
                            let value = Number(e.target.value)
                            if (selectedQuestion.maxValue && value > selectedQuestion.maxValue) {
                                value = selectedQuestion.maxValue
                            } 

                            updateQuestion({
                                ...selectedQuestion,
                                minValue: value
                            })
                        }}
                    />
                )}
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="maxNumber" className="font-normal text-sm">
                        Max {selectedQuestion.type.slug == "number" ? "number" : "characters"}
                    </Label>

                    <Switch
                        id="mavValue"
                        checked={hasMax}
                        onCheckedChange={() => {
                            updateQuestion({
                                ...selectedQuestion,
                                maxValue: hasMax ? undefined : (selectedQuestion.minValue ?? 1)
                            })
                        }}
                    />

                </div>

                {hasMax && (
                    <Input
                        placeholder="Max number"
                        type="number"
                        value={selectedQuestion.maxValue}
                        onChange={e => {
                            let value = Number(e.target.value)
                            if (selectedQuestion.minValue && value < selectedQuestion.minValue) {
                                value = selectedQuestion.minValue
                            } 

                            updateQuestion({
                                ...selectedQuestion,
                                maxValue: value
                            })
                        }}
                    />
                )}
            </div>
        </>
    )
}