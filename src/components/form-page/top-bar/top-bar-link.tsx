"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { cn } from "@/lib/utils"

type TopBarLinkProps = {
    href: string
    children: ReactNode
}

export function TopBarLink({ href, children }: TopBarLinkProps) {
    const isActive = usePathname() == href

    return (
        <Link href={href} className={cn("hover:bg-zinc-100 transition-colors relative after:bottom-0 after:left-1/2 after:transition-all after:absolute flex justify-center items-center after:bg-primary rounded-lg px-2 after:w-0 h-full after:h-0.5 text-zinc-500", isActive && "after:w-full text-black after:left-0")}>
            {children}
        </Link>
    )
}