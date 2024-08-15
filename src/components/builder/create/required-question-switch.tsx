"use client"

import { useCreateForm } from "@/contexts/create-form-context" 
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function RequiredQuestionSwitch() {
    const { selectedQuestion, updateQuestion } = useCreateForm()

    return (
        <div className="flex justify-between items-center">
            <Label htmlFor="required" className="font-normal text-sm">
                Required
            </Label>

            <Switch
                id="required"
                checked={selectedQuestion?.isRequired}
                onCheckedChange={checked => {
                    updateQuestion({
                        ...selectedQuestion!,
                        isRequired: checked
                    })
                }}
            />
        </div>
    )
}