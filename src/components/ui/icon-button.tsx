import { ElementType } from "react"

import { Button, ButtonProps } from "./button"
import { cn } from "@/lib/utils"

type IconButtonProps = ButtonProps & {
    icon: ElementType
}

export function IconButton({ icon: Icon, ...rest }: IconButtonProps) {
    return (
        <Button {...rest} className={cn("flex items-center gap-2", rest.className)}>
            <Icon
                size={20}
            />

            {rest.children}
        </Button>
    )
}