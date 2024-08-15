"use client"

import { useCreateForm } from "@/contexts/create-form-context"
import { Separator } from "@/components/ui/separator"
import { MinMaxValueOption } from "./min-max-value-option"
import { OpinionScaleOptions } from "./opinion-scale-options"
import { QuestionTypeSelect } from "./question-type-select"
import { RequiredQuestionSwitch } from "./required-question-switch"
import { QuestionButtonTextInput } from "./question-button-text-input"

export function QuestionSettings() {
    const { selectedQuestion } = useCreateForm()

    return (
        <>
            <QuestionTypeSelect />

            <Separator />

            <div className="space-y-4">
                <RequiredQuestionSwitch />

                {(selectedQuestion?.type.slug == "number" || selectedQuestion?.type.category.slug == "text") && (
                    <MinMaxValueOption />
                )}

                {selectedQuestion?.type.slug == "opinionScale" && (
                    <OpinionScaleOptions />
                )}

                <Separator />

                <QuestionButtonTextInput />
            </div>
        </>
    )
}