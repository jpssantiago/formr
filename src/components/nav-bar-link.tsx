"use client"

import { ElementType, ReactNode } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

type NavBarLinkProps = {
    href: string
    icon: ElementType
    children: ReactNode
    onClick?: () => void
}

export function NavBarLink({ href, icon: Icon, children, onClick }: NavBarLinkProps) {
    const pathname = usePathname()
    const isActive = pathname == href

    return (
        <Link href={href} onClick={onClick}>
            <div className={cn("flex items-center gap-2 px-3 py-2.5 text-zinc-800 text-sm rounded-lg transition-all hover:bg-zinc-200", isActive && "text-black font-medium bg-zinc-200")}>
                <Icon size={18} />

                <p>
                    {children}
                </p>
            </div>
        </Link>
    )
}