import { TQuestion } from "@/models/question"
import { cn } from "@/lib/utils"

type QuestionBadgeProps = {
    question: TQuestion
}
export function QuestionTypeBadge({ question }: QuestionBadgeProps) {
    return (
        <div className={cn("flex items-center gap-3 bg-blue-500/30 px-2 py-1 rounded-md", question.type.category.color)}>
            {<question.type.icon size={16} />}

            <p className="text-sm truncate">
                {question.order + 1}
            </p>
        </div>
    )
}