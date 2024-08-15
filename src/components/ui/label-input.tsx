import { forwardRef } from "react"

import { Input, InputProps } from "./input"

type LabelInputProps = InputProps & {
    label: string
}

export const LabelInput = forwardRef<HTMLInputElement, LabelInputProps>(
    ({ label, ...rest }, ref) => (
        <div className="space-y-0.5">
            <label className="text-sm">
                {label}
            </label>

            <Input
                ref={ref}
                {...rest}
            />
        </div>
    )
)

LabelInput.displayName = "LabelInput"