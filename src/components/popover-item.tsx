"use client"

import { ElementType, ReactNode } from "react"
import { PopoverClose } from "@radix-ui/react-popover"

type PopoverItemProps = {
    onClick?: () => void
    icon?: ElementType
    children: ReactNode
}

export function PopoverItem({ onClick, icon: Icon, children }: PopoverItemProps) {
    return (
        <PopoverClose>
            <div onClick={onClick} className="flex items-center gap-2 hover:bg-zinc-200 px-3 py-2 w-64 text-zinc-800 hover:text-black transition-all cursor-pointer">
                {Icon && (
                    <Icon
                        size={18}
                        className=""
                    />
                )}

                <p className="text-sm">
                    {children}
                </p>
            </div>
        </PopoverClose>
    )
}