"use client"

import { useCreateForm } from "@/contexts/create-form-context"
import { Input } from "@/components/ui/input"

export function QuestionSettings() {
    const { selectedQuestion, updateQuestion } = useCreateForm()

    return (
        <div className="bg-zinc-100 rounded-lg w-80 h-full">
            <Input
                placeholder="Continue"
                value={selectedQuestion.buttonText}
                onChange={e => {
                    updateQuestion({
                        ...selectedQuestion,
                        buttonText: e.target.value
                    })
                }}
            />
        </div>
    )
}