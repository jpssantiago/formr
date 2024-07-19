import { ElementType, ReactNode } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { cn } from "@/lib/utils"

type NavBarLinkProps = {
    href: string
    children: ReactNode
    onClick?: () => void
}

export function NavBarLink({ href, children, onClick }: NavBarLinkProps) {
    "use client"

    const pathname = usePathname()
    const isActive = pathname == href
    
    return (
        <Link href={href} onClick={onClick}>
            <div className={cn("flex items-center gap-3 px-2.5 h-10 text-zinc-600 rounded-sm transition-all hover:bg-zinc-200 hover:text-black", isActive && "text-black font-medium bg-zinc-200")}>
                {children}
            </div>
        </Link>
    )
}

export function NavBarLinkIcon({ icon: Icon }: { icon: ElementType }) {
    return (
        <Icon 
            size={20}
        />
    )
}

export function NavBarLinkText({ children }: { children: ReactNode }) {
    return (
        <p className="text-sm">
            {children}
        </p>
    )
}