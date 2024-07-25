import { QuestionList } from "@/components/form-page/create/question-list"
import { CreateQuestion } from "@/components/form-page/create/create-question"
import { QuestionSettings } from "@/components/form-page/create/question-settings"
import { FormActions } from "@/components/form-page/top-bar/form-actions"

export default async function CreateFormPage() {
    return (
        <div className="flex gap-5 mb-5 h-full overflow-y-hidden">
            <QuestionList />

            <div className="flex flex-col flex-1 gap-5">
                <FormActions />
                <CreateQuestion />
            </div>

            <QuestionSettings />
        </div>
    )
}