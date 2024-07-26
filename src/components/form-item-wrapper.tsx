import { ReactNode } from "react"

import { TQuestion } from "@/models/question"
import { LoadingButton } from "./ui/loading-button"

type FormItemWrapper = {
    question: TQuestion
    onSubmit: any
    error: string
    isValid: boolean
    isLoading: boolean
    children: ReactNode
}

export function FormItemWrapper({ question, onSubmit, error, isValid, isLoading, children }: FormItemWrapper) {
    return (
        <form onSubmit={onSubmit} className="flex flex-col justify-center items-start gap-4 mx-auto w-full max-w-[500px] h-full">
            <div className="space-y-2 w-full">
                <h1 className="font-medium text-xl">
                    {question.title}
                </h1>

                {question.description && (
                    <p className="text-zinc-500">
                        {question.description}
                    </p>
                )}

                {error && (
                    <p className="text-destructive text-sm">
                        Error: {error}
                    </p>
                )}
            </div>

            <div className="space-y-2 w-full">
                {children}
            </div>

            <LoadingButton loading={isLoading} disabled={!isValid}>
                {question.buttonText}
            </LoadingButton>
        </form>
    )
}