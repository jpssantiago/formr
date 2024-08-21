"use client"

import { useFormBuilder } from "@/contexts/use-form-builder"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formats = ["dd/mm/yyyy", "mm/dd/yyyy", "yyyy/mm/dd"]

export function DateQuestionFormatSelector() {
    const { selectedQuestion, updateQuestion } = useFormBuilder()

    return (
        <div className="space-y-2">
            <p className="text-sm">
                Date format
            </p>

            <Select
                value={selectedQuestion?.mask ?? formats[0]}
                onValueChange={mask => {
                    updateQuestion({
                        ...selectedQuestion!,
                        mask
                    })
                }}
            >
                <SelectTrigger>
                    <SelectValue>
                        {selectedQuestion?.mask ?? formats[0]}
                    </SelectValue>
                </SelectTrigger>

                <SelectContent>
                    {formats.map((format, index) => (
                        <SelectItem key={index} value={format}>
                            {format}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}