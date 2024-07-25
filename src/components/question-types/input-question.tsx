import { TQuestion } from "@/models/question"
import { CountryCodeSelector } from "@/components/ui/country-code-selector"
import { BorderInput } from "@/components/ui/border-input"

export function InputQuestion({ question }: { question: TQuestion }) {
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
            placeholder = "01/01/2001"
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

            <BorderInput
                placeholder={placeholder}
                type={question.type.slug == "number" ? "number" : "text"}
                readOnly
            />
        </div>
    )
}