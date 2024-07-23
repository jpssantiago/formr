import { Link, Mail, Phone, WrapText, Text, Hash, Calendar, ToggleRight, Laugh } from "lucide-react"

import { QuestionType } from "@/models/question-type"
import { CATEGORY_LIST } from "./categories"

export const TYPE_LIST: QuestionType[] = [
    {
        slug: "url",
        icon: Link,
        name: "Website",
        category: CATEGORY_LIST.find(c => c.slug == "input")!,
    }, {
        slug: "email",
        icon: Mail,
        name: "Email",
        category: CATEGORY_LIST.find(c => c.slug == "input")!,
    }, {
        slug: "phoneNumber",
        icon: Phone,
        name: "Phone number",
        category: CATEGORY_LIST.find(c => c.slug == "input")!,
    }, {
        slug: "shortText",
        icon: Text,
        name: "Short Text",
        category: CATEGORY_LIST.find(c => c.slug == "text")!,
    }, {
        slug: "longText",
        icon: WrapText,
        name: "Long Text",
        category: CATEGORY_LIST.find(c => c.slug == "text")!,
    }, {
        slug: "number",
        icon: Hash,
        name: "Number",
        category: CATEGORY_LIST.find(c => c.slug == "input")!,
    }, {
        slug: "date",
        icon: Calendar,
        name: "Date",
        category: CATEGORY_LIST.find(c => c.slug == "input")!,
    }, {
        slug: "yesNo",
        icon: ToggleRight,
        name: "Yes / No",
        category: CATEGORY_LIST.find(c => c.slug == "choice")!,
    }, {
        slug: "emoji",
        icon: Laugh,
        name: "Emoji",
        category: CATEGORY_LIST.find(c => c.slug == "rating")!,
    }
]