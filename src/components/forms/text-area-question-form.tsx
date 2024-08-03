import { forwardRef, TextareaHTMLAttributes } from "react"

import { cn } from "@/lib/utils"

type TextAreaQuestionFormProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {}

const TextAreaQuestionForm = forwardRef<HTMLTextAreaElement, TextAreaQuestionFormProps>(
    ({ ...rest }, ref) => {
        return (
            <textarea
                {...rest}
                ref={ref}
                placeholder="Your (long) answer..."
                className={cn("max-h-96 py-2 h-12 border-b-[#0545AF]/30 border-b-2 focus-visible:border-b-[#0545AF] w-full text-[#0545AF] text-xl placeholder:text-[#0545AF]/30 transition-colors outline-none resize-none overflow-y-scroll transparent-scroll", rest.className)}
                onInput={e => {
                    const textarea = e.currentTarget
                    textarea.style.height = "48px"
                    textarea.style.height = `${textarea.scrollHeight + 2}px`
                }}
            />
        )
    }
)

TextAreaQuestionForm.displayName = "TextareaQuestionForm"

export { TextAreaQuestionForm }