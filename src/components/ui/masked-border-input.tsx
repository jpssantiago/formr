import { InputHTMLAttributes, forwardRef } from "react"
import InputMask, { Props } from "react-input-mask"

type MaskedBorderInputProps = InputHTMLAttributes<HTMLInputElement> & Props & {}

const MaskedBorderInput = forwardRef<HTMLInputElement, MaskedBorderInputProps>(
    ({ ...rest }, ref) => {
        return (
            <InputMask
                inputRef={ref}
                className="p-0 border-b-[#0545AF]/30 border-b-2 w-full h-full text-[#0545AF] text-xl placeholder:text-[#0545AF]/30 transition-all outline-none"
                type="text"
                {...rest}
            />
        )
    }
)

MaskedBorderInput.displayName = "MaskedBorderInput"

export { MaskedBorderInput }