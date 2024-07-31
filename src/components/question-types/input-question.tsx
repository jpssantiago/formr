import { InputHTMLAttributes, forwardRef } from "react"

import { TQuestion } from "@/models/question"
import { CountryCodeSelector } from "@/components/ui/country-code-selector"
import { BorderInput } from "@/components/ui/border-input"
import { MaskedBorderInput } from "@/components/ui/masked-border-input"

type InputQuestionProps = InputHTMLAttributes<HTMLInputElement> & {
    question: TQuestion
    readOnly?: boolean
}

const InputQuestion = forwardRef<HTMLInputElement, InputQuestionProps>(
    ({ question, readOnly = true, ...rest }, ref) => {
        let placeholder = ""

        switch (question.type.slug) {
            case "url":
                placeholder = "https://"
                break
            case "email":
                placeholder = "email@provider.com"
                break
            case "number":
                placeholder = "123..."
                break
            case "date":
                placeholder = "dd/mm/yyyy"
                break
            case "shortText":
            default:
                placeholder = "Your answer..."
        }

        return (
            <div className="flex gap-3 h-12">
                {question.type.slug == "phoneNumber" && (
                    <CountryCodeSelector />
                )}

                {question.type.slug == "date" ? (
                    <MaskedBorderInput
                        ref={ref}
                        mask="99/99/9999"
                        maskChar={null}
                        placeholder={placeholder}
                        readOnly={readOnly}
                        {...rest}
                        type="text"
                    />
                ) : (
                    <BorderInput
                        ref={ref}
                        placeholder={placeholder}
                        type={question.type.slug == "number" ? "number" : "text"}
                        readOnly={readOnly}
                        {...rest}
                    />
                )}
            </div>
        )
    }
)

InputQuestion.displayName = "InputQuestion"

export { InputQuestion }