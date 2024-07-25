import { ElementType } from "react"

import { TQuestionCategory } from "./question-category"

export type TQuestionType = {
    slug: string
    icon: ElementType
    name: string
    category: TQuestionCategory
}