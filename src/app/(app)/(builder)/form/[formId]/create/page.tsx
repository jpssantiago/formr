import { QuestionList } from "@/components/builder/create/question-list"
import { QuestionSettings } from "@/components/builder/create/question-settings"
import { FormActions } from "@/components/builder/create/form-actions"
import { QuestionCardList } from "@/components/builder/create/question-card-list"
import { CreateQuestionForm } from "@/components/create-question-form"

export default async function CreateFormPage() {
    return (
        <div className="flex gap-5 mb-5 h-full overflow-y-hidden">
            <QuestionList />

            <div className="flex flex-col flex-1 gap-5">
                <FormActions />

                <div className="flex large:hidden h-full">
                    <div className="flex flex-col justify-center items-center p-5 border rounded-lg size-full">
                        <CreateQuestionForm />
                    </div>
                </div>

                <div className="large:flex flex-col hidden h-full overflow-y-hidden">
                    <QuestionCardList />
                </div>
            </div>

            <div className="flex flex-col gap-4 large:hidden bg-zinc-100 p-3 rounded-lg w-60 h-full">
                <QuestionSettings />
            </div>
        </div>
    )
}