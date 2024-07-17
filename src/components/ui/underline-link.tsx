import { ReactNode } from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

type UnderlineLinkProps = {
    href: string
    children?: ReactNode
    className?: string
}

export function UnderlineLink({ href, children, className }: UnderlineLinkProps) {
    return (
        <Link href={href} className={cn("relative after:bottom-0 after:left-0 after:absolute after:bg-blue-500 w-fit after:w-0 hover:after:w-full after:h-px text-blue-500 text-sm after:transition-all after:duration-300", className)}>
            {children}
        </Link>
    )
}