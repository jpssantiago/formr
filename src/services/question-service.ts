import { TQuestion } from "@/models/question"

type SaveQuestionsResponse = {
    questions?: TQuestion[]
    err?: string
}

export const QuestionService = {
    async saveQuestions(formId: string, questions: TQuestion[]): Promise<SaveQuestionsResponse> {
        try {
            const response = await fetch(`/api/questions/${formId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ questions })
            })

            const data = await response.json()
            return { questions: data.questions }
        } catch {
            return { err: "server-not-responding" }
        }
    }
}