import { ReactNode } from "react"

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import { cn } from "@/lib/utils"

type TooltipWrapperProps = {
    children: ReactNode
    tooltip: string
    asChild?: boolean
    className?: string
    align?: "start" | "center" | "end"
}

export function TooltipWrapper({ children, tooltip, asChild = true, className, align = "center" }: TooltipWrapperProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild={asChild}>
                <span>
                    {children}
                </span>
            </TooltipTrigger>

            <TooltipContent 
                className={cn("bg-primary border-zinc-700 text-white text-sm", className)}
                align={align}
            >
                {tooltip}
            </TooltipContent>
        </Tooltip>
    )
}