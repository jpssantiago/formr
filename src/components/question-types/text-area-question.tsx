import { forwardRef } from "react"

import { Textarea } from "@/components/ui/textarea"

type TextAreaQuestionProps = {
    readOnly?: boolean
}

const TextAreaQuestion = forwardRef<HTMLTextAreaElement, TextAreaQuestionProps>(
    ({ readOnly, ...rest }, ref) => {
        return (
            <Textarea
                ref={ref}
                {...rest}
                placeholder="Your answer (multi-line)..."
                className={`mb-5 hover:border-primary focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 ${readOnly ? "h-20" : "h-[38px]"} min-h-[38px] transition-colors resize-none transparent-scroll`}
                onInput={event => {
                    const textarea = event.currentTarget
                    textarea.style.height = "38px"
                    textarea.style.height = `${textarea.scrollHeight + 2}px`
                }}
                readOnly={readOnly}
            />
        )
    }
)

TextAreaQuestion.displayName = "TextAreaQuestion"

export { TextAreaQuestion }