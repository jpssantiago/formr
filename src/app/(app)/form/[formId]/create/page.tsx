import { QuestionList } from "@/components/form-page/create/question-list"
import { CreateQuestion } from "@/components/form-page/create/create-question"
import { QuestionSettings } from "@/components/form-page/create/question-settings"

export default async function CreateFormPage() {
    return (
        <div className="flex gap-5 mb-5 h-full overflow-y-hidden">
            <QuestionList />
            <CreateQuestion />
            <QuestionSettings />
        </div>
    )
}