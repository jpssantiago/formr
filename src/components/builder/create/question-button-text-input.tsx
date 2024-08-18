"use client"

import { useFormBuilder } from "@/contexts/use-form-builder"
import { Input } from "@/components/ui/input"

export function QuestionButtonTextInput() {
    const { selectedQuestion, updateQuestion } = useFormBuilder()

    return (
        <div className="space-y-0.5">
            <label className="text-sm">
                Button text
            </label>

            <Input
                placeholder="Continue"
                value={selectedQuestion?.buttonText ?? ""}
                onChange={e => {
                    updateQuestion({
                        ...selectedQuestion!,
                        buttonText: e.target.value
                    })
                }}
            />
        </div>
    )
}