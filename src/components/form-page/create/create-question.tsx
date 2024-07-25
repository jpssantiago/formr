"use client"

import { useCreateForm } from "@/contexts/create-form-context"
import { CreateQuestionForm } from "./create-question-form"

export function CreateQuestion() {
    const { selectedQuestion } = useCreateForm()

    return (
        <div className="flex flex-col justify-center items-center border rounded-lg size-full">
            <CreateQuestionForm
                question={selectedQuestion}
            />
        </div>
    )
}