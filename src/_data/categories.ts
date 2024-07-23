import { QuestionCategory } from "@/models/question-category"

export const CATEGORY_LIST: QuestionCategory[] = [
    {
        slug: "input",
        name: "Validated Inputs",
        color: "bg-blue-500/30"
    }, {
        slug: "choice",
        name: "Choice",
        color: "bg-purple-500/30"
    }, {
        slug: "text",
        name: "Text",
        color: "bg-emerald-500/30"
    }, {
        slug: "rating",
        name: "Rating",
        color: "bg-yellow-500/30"
    }
]