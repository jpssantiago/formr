import { ElementType } from "react"

import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type IconButtonProps = ButtonProps & {
    icon: ElementType
    className?: string
    iconSize?: number
}

export function IconButton({ icon: Icon, className, iconSize = 18, ...rest }: IconButtonProps) {
    return (
        <Button
            {...rest}
            size="icon"
            variant="ghost"
            className={cn("hover:bg-zinc-200 h-9 text-zinc-600 hover:text-black", className)}
        >
            <Icon
                size={iconSize}
            />
        </Button>
    )
}