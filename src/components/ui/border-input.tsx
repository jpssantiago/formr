import { cn } from "@/lib/utils"
import { InputHTMLAttributes } from "react"

type BorderInputProps = InputHTMLAttributes<HTMLInputElement> & {}

export function BorderInput({ ...rest }: BorderInputProps) {
    return (
        <input
            {...rest}
            className={cn("py-2 border-b-[#0545AF]/30 border-b-2 focus-visible:border-b-[#0545AF] w-full text-[#0545AF] text-xl placeholder:text-[#0545AF]/30 transition-all outline-none", rest.className)}
        />
    )
}