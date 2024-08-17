import { TEmojiOption } from "@/models/emoji-option"
import { EmojiOption } from "@/components/ui/emoji-option"

type YesNoQuestionProps = {
    onSelect?: (value: string) => void
    selectedAnswer?: string
}

const options: TEmojiOption[] = [
    {
        emoji: "👍",
        value: "Yes"
    }, {
        emoji: "👎",
        value: "No"
    }
]

export function YesNoQuestion({ onSelect, selectedAnswer }: YesNoQuestionProps) {
    return (
        <div className="flex gap-2">
            {options.map((option, index) => (
                <EmojiOption
                    key={index}
                    option={option}
                    onSelect={onSelect}
                    isSelected={selectedAnswer == option.value}
                />
            ))}
        </div>
    )
} 