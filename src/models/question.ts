import { QuestionType } from "./question-type"

export type Question = {
    id: string
    title: string
    description?: string
    order: number
    buttonText: string

    isRequired: boolean
    
    type: QuestionType

    minValue?: number
    maxValue?: number
}