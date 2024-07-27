import { InputHTMLAttributes, forwardRef } from "react"

import { cn } from "@/lib/utils"

type BorderInputProps = InputHTMLAttributes<HTMLInputElement> & {}

const BorderInput = forwardRef<HTMLInputElement, BorderInputProps>(
    ({ className, type, ...rest }, ref) => {
        return (
            <input
                className={cn("py-2 border-b-[#0545AF]/30 border-b-2 focus-visible:border-b-[#0545AF] w-full text-[#0545AF] text-xl placeholder:text-[#0545AF]/30 transition-all outline-none", className)}
                ref={ref}
                {...rest}
            />
        )
    }
)

BorderInput.displayName = "BorderInput"

export { BorderInput }