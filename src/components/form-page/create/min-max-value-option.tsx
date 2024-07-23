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
                        Min number
                    </Label>

                    <Switch
                        id="minNumber"
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
                            updateQuestion({
                                ...selectedQuestion,
                                minValue: Number(e.target.value)
                            })
                        }}
                    />
                )}
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="maxNumber" className="font-normal text-sm">
                        Max number
                    </Label>

                    <Switch
                        id="maxNumber"
                        checked={hasMax}
                        onCheckedChange={() => {
                            updateQuestion({
                                ...selectedQuestion,
                                maxValue: hasMax ? undefined : 1
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
                            updateQuestion({
                                ...selectedQuestion,
                                maxValue: Number(e.target.value)
                            })
                        }}
                    />
                )}
            </div>
        </>
    )
}