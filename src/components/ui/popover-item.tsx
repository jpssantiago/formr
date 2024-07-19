"use client"

import { ElementType, ReactNode } from "react"
import { tv } from "tailwind-variants"
import { PopoverClose } from "@radix-ui/react-popover"

type PopoverItemProps = {
    onClick?: () => void
    children: ReactNode
    variant?: "default" | "destructive"
    autoClose?: boolean
}

export function PopoverItem({ onClick, children, variant = "default", autoClose = true }: PopoverItemProps) {
    const item = tv({
        base: "flex items-center gap-3 hover:bg-zinc-200 px-3 py-2 rounded-sm w-full transition-all cursor-pointer",
        variants: {
            variant: {
                default: "text-zinc-800 hover:text-black",
                destructive: "text-destructive hover:text-white hover:bg-destructive"
            }
        }
    })

    function Item() {
        return (
            <div onClick={onClick} className={item({ variant })}>
                {children}
            </div>
        )
    }

    if (!autoClose) {
        return <Item />
    }

    return (
        <PopoverClose className="w-full" autoFocus={false}>
            <Item />
        </PopoverClose>
    )
}

export function PopoverItemIcon({ icon: Icon }: { icon: ElementType }) {
    return (
        <Icon
            size={18}
            className=""
        />
    )
}

export function PopoverItemText({ children }: { children: ReactNode }) {
    return (
        <p className="text-sm">
            {children}
        </p>
    )
}