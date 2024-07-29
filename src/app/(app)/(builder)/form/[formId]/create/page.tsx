import { QuestionList } from "@/components/form-page/create/question-list"
import { CreateQuestion } from "@/components/form-page/create/create-question"
import { QuestionSettings } from "@/components/form-page/create/question-settings"
import { FormActions } from "@/components/form-page/create/form-actions"
import { QuestionCardList } from "@/components/form-page/create/question-card-list"

export default async function CreateFormPage() {
    return (
        <div className="flex gap-5 mb-5 h-full overflow-y-hidden">
            <QuestionList />

            <div className="flex flex-col flex-1 gap-5">
                <FormActions />

                <div className="flex large:hidden h-full">
                    <CreateQuestion />
                </div>

                <div className="large:flex flex-col hidden overflow-y-hidden">
                    <QuestionCardList />
                </div>
            </div>

            <QuestionSettings />
        </div>
    )
}