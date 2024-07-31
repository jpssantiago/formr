import { QuestionList } from "@/components/builder/create/question-list"
import { CreateQuestion } from "@/components/builder/create/create-question"
import { QuestionSettings } from "@/components/builder/create/question-settings"
import { FormActions } from "@/components/builder/create/form-actions"
import { QuestionCardList } from "@/components/builder/create/question-card-list"

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