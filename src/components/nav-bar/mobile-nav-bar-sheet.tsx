"use client"

import { ReactNode, useState } from "react"
import { Home, Settings } from "lucide-react"

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { NavBarLink, NavBarLinkIcon, NavBarLinkText } from "./nav-bar-link"

type MobileNavBarSheetProps = {
    children: ReactNode
}

export function MobileNavBarSheet({ children }: MobileNavBarSheetProps) {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>

            <SheetContent side="left" aria-describedby={undefined} className="flex flex-col gap-8 w-[280px] sm:w-[300px]">
                <SheetTitle>
                    Formr
                </SheetTitle>

                <nav className="flex flex-col gap-2">
                    <NavBarLink href="/dashboard" onClick={() => setOpen(false)}>
                        <NavBarLinkIcon icon={Home} />
                        <NavBarLinkText>Dashboard</NavBarLinkText>
                    </NavBarLink>

                    <NavBarLink href="/settings" onClick={() => setOpen(false)}>
                        <NavBarLinkIcon icon={Settings} />
                        <NavBarLinkText>Settings</NavBarLinkText>
                    </NavBarLink>
                </nav>
            </SheetContent>
        </Sheet>
    )
}