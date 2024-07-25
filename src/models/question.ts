import { TQuestionType } from "./question-type"

export type TQuestion = {
    id: string
    title: string
    description?: string
    order: number
    buttonText: string

    isRequired: boolean
    
    type: TQuestionType

    minValue?: number
    maxValue?: number
}