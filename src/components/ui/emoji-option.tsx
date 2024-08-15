"use client"

import { cn } from "@/lib/utils"
import { TEmojiOption } from "@/models/emoji-option"

type EmojiOptionProps = {
    option: TEmojiOption
    onSelect?: (answer: string) => void
    isSelected: boolean
}

export function EmojiOption({ option, onSelect, isSelected }: EmojiOptionProps) {
    return (
        <div 
            className={
                cn(
                    "flex flex-col justify-center items-center gap-1 border rounded-md size-20 cursor-pointer text-zinc-600 transition-all hover:-translate-y-1 hover:border-blue-500", 
                    isSelected && "border-blue-500 text-blue-500 hover:translate-y-0"
                )
            }
            onClick={() => onSelect && onSelect(option.value)}
        >
            <p className="text-2xl">
                {option.emoji}
            </p>

            <p className="text-sm">
                {option.value}
            </p>
        </div>
    )
}