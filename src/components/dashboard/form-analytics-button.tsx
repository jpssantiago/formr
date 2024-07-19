"use client"

import { ElementType, ReactNode } from "react"

import { Button } from "@/components/ui/button"

type FormAnalyticsButtonProps = {
    icon: ElementType
    children: ReactNode
}

export function FormAnalyticsButton({ icon: Icon, children }: FormAnalyticsButtonProps) {
    return (
        <Button onClick={e => e.stopPropagation()} className="flex items-center gap-2 medium:gap-1 bg-zinc-200 hover:bg-zinc-300 small:p-2 border group-hover:border border-transparent text-zinc-500 hover:text-black" variant="secondary">
            <Icon
                className="size-5 medium:size-3"
            />

            <span className="medium:hidden">
                {children}
            </span>

            <span className="medium:block hidden text-xs">
                {children?.toString().slice(0, 1)}
            </span>
        </Button>
    )
}