"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { TQuestion } from "@/models/question"
import { FormItemWrapper } from "@/components/form-item-wrapper"
import { InputQuestion } from "@/components/question-types/input-question"

type InputQuestionFormProps = {
    question: TQuestion
    onContinue: () => void
}

export function InputQuestionForm({ question, onContinue }: InputQuestionFormProps) {
    function getSchema() {
        if (!question.isRequired) return z.string()

        switch (question.type.slug) {
            case "url":
                return z.string().url()
            case "email":
                return z.string().email()
            case "phoneNumber":
                return z.string() // TODO: Validate the phone number
            case "number":
                return z.coerce.number()
            case "date":
                return z.string() // TODO: Let the user choose the format (ex: dd/mm/yyyy, mm/dd/yyyy, yyyy/mm/dd, yyyy/dd/mm)
            default:
                return z.string().min(1)
        }
    }

    const schema = z.object({
        value: getSchema()
    })

    type SchemaType = z.infer<typeof schema>

    const { handleSubmit, register, formState } = useForm<SchemaType>({
        resolver: zodResolver(schema)
    })

    function onSubmit({ value }: SchemaType) {
        console.log(value)
        onContinue()
    }

    return (
        <FormItemWrapper 
            question={question}
            onSubmit={handleSubmit(onSubmit)} 
            error={formState.errors.root?.message || formState.errors.value?.message || ""}
            isLoading={formState.isSubmitting}
            isValid={formState.isValid}
        >
            <InputQuestion
                question={question}
                readOnly={false}
                {...register("value")}
            />
        </FormItemWrapper>
    )
}