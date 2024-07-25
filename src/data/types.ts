import {
    Link,
    Mail,
    Phone,
    WrapText,
    Text,
    Hash,
    Calendar,
    ToggleRight,
    Laugh
} from "lucide-react"

import { TQuestionType } from "@/models/question-type"
import { QUESTION_TYPES_CATEGORIES } from "./categories"

export const QUESTION_TYPES: TQuestionType[] = [
    {
        slug: "url",
        icon: Link,
        name: "Website",
        category: QUESTION_TYPES_CATEGORIES.find(c => c.slug == "input")!,
    }, {
        slug: "email",
        icon: Mail,
        name: "Email",
        category: QUESTION_TYPES_CATEGORIES.find(c => c.slug == "input")!,
    }, {
        slug: "phoneNumber",
        icon: Phone,
        name: "Phone number",
        category: QUESTION_TYPES_CATEGORIES.find(c => c.slug == "input")!,
    }, {
        slug: "shortText",
        icon: Text,
        name: "Short Text",
        category: QUESTION_TYPES_CATEGORIES.find(c => c.slug == "text")!,
    }, {
        slug: "longText",
        icon: WrapText,
        name: "Long Text",
        category: QUESTION_TYPES_CATEGORIES.find(c => c.slug == "text")!,
    }, {
        slug: "number",
        icon: Hash,
        name: "Number",
        category: QUESTION_TYPES_CATEGORIES.find(c => c.slug == "input")!,
    }, {
        slug: "date",
        icon: Calendar,
        name: "Date",
        category: QUESTION_TYPES_CATEGORIES.find(c => c.slug == "input")!,
    }, {
        slug: "yesNo",
        icon: ToggleRight,
        name: "Yes / No",
        category: QUESTION_TYPES_CATEGORIES.find(c => c.slug == "choice")!,
    }, {
        slug: "emoji",
        icon: Laugh,
        name: "Emoji",
        category: QUESTION_TYPES_CATEGORIES.find(c => c.slug == "rating")!,
    }
]