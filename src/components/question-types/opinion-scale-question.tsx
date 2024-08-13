import { TQuestion } from "@/models/question"
import { cn } from "@/lib/utils"

type OpinionScaleQuestionProps = {
    question: TQuestion
    onSelect?: (value: string) => void
    selectedAnswer?: string
}

export function OpinionScaleQuestion({ question, onSelect, selectedAnswer }: OpinionScaleQuestionProps) {
    const minValue = question.minValue ?? 0
    const maxValue = question.maxValue ?? 10
    const options = Array.from({ length: maxValue - minValue + 1 }, (_, i) => i + minValue)

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-2">
                {options.map((value, index) => (
                    <div 
                        key={index} 
                        className={
                            cn(
                                "p-5 border hover:border-blue-500 rounded-md w-full text-center text-zinc-600 will-change-transform transition-all hover:-translate-y-1 cursor-pointer", 
                                selectedAnswer == value.toString() && "border-blue-500 hover:translate-y-0 text-blue-500"
                            )
                        }
                        onClick={() => onSelect && onSelect(value.toString())}
                    >
                        {value}
                    </div>
                ))}
            </div>

            <div className="flex justify-between text-sm text-zinc-600">
                <p>
                    {question.leftPlaceholder ?? "Not likely at all"}
                </p>

                <p className="text-end">
                    {question.rightPlaceholder ?? "Extremelly likely"}
                </p>
            </div>
        </div>
    )
}