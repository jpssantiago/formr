import { ElementType } from "react"

export type Question = {
    id: string
    title: string
    description?: string
    order: number
    buttonText: string
    
    type: QuestionType

    minValue?: number
    maxValue?: number
}

export type QuestionCategory = {
    slug: string
    color: string
}

export type QuestionType = {
    slug: string
    icon: ElementType
    name: string
    category: QuestionCategory
}