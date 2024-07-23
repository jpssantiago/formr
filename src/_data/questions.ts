import { createId } from "@paralleldrive/cuid2"

import { Question } from "@/models/question"
import { TYPE_LIST } from "./types"

export const QUESTION_LIST: Question[] = [
    {
        id: createId(),
        title: "",
        description: "",
        order: 0,
        buttonText: "Continue",
        type: TYPE_LIST.find(t => t.slug == "shortText")!,
        isRequired: true
    }
]