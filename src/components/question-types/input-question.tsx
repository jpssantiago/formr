import { InputHTMLAttributes, forwardRef } from "react"
import ReactInputMask from "react-input-mask"

import { TQuestion } from "@/models/question"
import { CountryCodeSelector } from "@/components/ui/country-code-selector"
import { Input } from "@/components/ui/input"

type InputQuestionProps = InputHTMLAttributes<HTMLInputElement> & {
    question: TQuestion
    readOnly?: boolean
}

const InputQuestion = forwardRef<HTMLInputElement, InputQuestionProps>(
    ({ question, readOnly = false, ...rest }, ref) => {
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
            <div className="flex gap-x-3 my-1.5 h-12">
                {question.type.slug == "phoneNumber" && (
                    <CountryCodeSelector />
                )}

                {question.type.slug == "date" ? (
                    <ReactInputMask
                        inputRef={ref}
                        {...rest}
                        mask="99/99/9999"
                        placeholder={placeholder}
                        className="border-input hover:border-primary focus-visible:border-primary bg-background px-3 py-2 border rounded-md w-full h-10 text-sm phone:text-base transition-all outline-none"
                        readOnly={readOnly}
                    />
                ) : (
                    <Input
                        ref={ref}
                        {...rest}
                        placeholder={placeholder}
                        readOnly={readOnly}
                    />
                )}
            </div>
        )
    }
)

InputQuestion.displayName = "InputQuestion"

export { InputQuestion }