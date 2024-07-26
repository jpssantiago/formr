import { ElementType } from "react"

import { Button, ButtonProps } from "./button"
import { cn } from "@/lib/utils"

type IconButtonProps = ButtonProps & {
    icon: ElementType
    iconSize?: number
}

export function IconButton({ icon: Icon, iconSize = 20, ...rest }: IconButtonProps) {
    return (
        <Button {...rest} className={cn("flex items-center gap-2", rest.className)}>
            <Icon
                size={iconSize}
            />

            {rest.children}
        </Button>
    )
}