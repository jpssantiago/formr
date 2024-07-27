import { ReactNode } from "react"
import { ArrowRight } from "lucide-react"

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
        <form onSubmit={onSubmit} className="flex items-start gap-3 mx-auto w-full max-w-[500px]">
            <div className="flex items-center gap-1 mt-0.5 text-[#0545AF]">
                <p className="font-medium tabular-nums">
                    {question.order + 1}
                </p>

                <ArrowRight
                    size={20}
                />
            </div>

            <div className="space-y-4 w-full">
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

                <LoadingButton loading={isLoading} disabled={!isValid} className="px-8 w-fit">
                    {question.buttonText}
                </LoadingButton>
            </div>
        </form>
    )
}