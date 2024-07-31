"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { TQuestion } from "@/models/question"
import { FormItemWrapper } from "@/components/form-item-wrapper"
import { InputQuestion } from "@/components/question-types/input-question"

type InputQuestionFormProps = {
    question: TQuestion
    onContinue: (value: string | number) => void
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
                return z.string().min(4) // TODO: Validate the phone number
            case "number":
                return z.coerce.number()
            case "date":
                return z.string().min(10).max(10)
                // TODO: Let the user choose the format (ex: dd/mm/yyyy, mm/dd/yyyy, yyyy/mm/dd, yyyy/dd/mm)
            default:
                const schema = z.string().min(question.minValue ?? 1)
                return question.maxValue ? schema.max(question.maxValue) : schema
        }
    }

    const schema = z.object({
        value: getSchema()
    })

    type SchemaType = z.infer<typeof schema>

    const { handleSubmit, register, formState, reset } = useForm<SchemaType>({
        resolver: zodResolver(schema)
    })

    function onSubmit({ value }: SchemaType) {
        onContinue(value)
        reset()
    }

    function getInputType(): string {
        switch (question.type.slug) {
            case "number":
            case "email":
            case "date":
                return question.type.slug
            default:
                return "text"
        }
    }

    return (
        <FormItemWrapper
            question={question}
            onSubmit={handleSubmit(onSubmit)} 
            error={formState.errors.root?.message || ""}
            isLoading={formState.isSubmitting}
            isValid={formState.isValid}
        >
            <InputQuestion
                question={question}
                readOnly={false}
                type={getInputType()}
                {...register("value")}
            />
        </FormItemWrapper>
    )
}