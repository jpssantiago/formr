import { ElementType } from "react"

import { QuestionCategory } from "./question-category"

export type QuestionType = {
    slug: string
    icon: ElementType
    name: string
    category: QuestionCategory
}