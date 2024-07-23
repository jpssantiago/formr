import { Textarea } from "@/components/ui/textarea"

export function TextareaQuestion() {
    return (
        <Textarea
            placeholder="..."
            className="px-0 py-2 border-t-0 border-r-0 border-b-[#0545AF]/30 border-b-2 focus-visible:border-b-[#0545AF] border-l-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full h-[46px] min-h-[46px] text-[#0545AF] text-xl placeholder:text-[#0545AF]/30 resize-none"
            onInput={event => {
                const textarea = event.currentTarget
                textarea.style.height = "32px"
                textarea.style.height = `${textarea.scrollHeight}px`
            }}
            readOnly
        />
    )
}