import { TQuestion } from "./question"

export type TForm = {
    id: string
    name: string
    questions: TQuestion[]
    folderId: string
    isPublished: boolean
    authorId: string
}