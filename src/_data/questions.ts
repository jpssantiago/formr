import { Question } from "@/models/question"
import { TYPE_LIST } from "./types"

export const QUESTION_LIST: Question[] = [
    {
        id: "0",
        title: "Lorem ipsum",
        description: "Website",
        order: 0,
        buttonText: "Submit",
        type: TYPE_LIST.find(t => t.slug == "url")!,
    }, {
        id: "1",
        title: "Dolor sit",
        description: "Email",
        order: 1,
        buttonText: "Continue",
        type: TYPE_LIST.find(t => t.slug == "email")!
    }, {
        id: "2",
        title: "Amet consectetur",
        description: "Phone Number",
        order: 2,
        buttonText: "Continue",
        type: TYPE_LIST.find(t => t.slug == "phoneNumber")!
    }, {
        id: "3",
        title: "Vaselim elit",
        description: "Number",
        order: 3,
        buttonText: "Continue",
        type: TYPE_LIST.find(t => t.slug == "number")!,
        maxValue: 30
    }, {
        id: "4",
        title: "Vaselim elit",
        description: "Date",
        order: 4,
        buttonText: "Continue",
        type: TYPE_LIST.find(t => t.slug == "date")!
    }, {
        id: "5",
        title: "Barodom asas",
        description: "Short Text",
        order: 5,
        buttonText: "Continue",
        type: TYPE_LIST.find(t => t.slug == "shortText")!
    }, {
        id: "6",
        title: "Ecrom dom",
        description: "Long Text",
        order: 6,
        buttonText: "Continue",
        type: TYPE_LIST.find(t => t.slug == "longText")!
    }
]