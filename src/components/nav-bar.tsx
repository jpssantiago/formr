"use client"

import { useState } from "react"
import { Home, Menu, Settings } from "lucide-react"

import { NavBarLink } from "./nav-bar-link"
import { NavBarUserPopover } from "./nav-bar-user-popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function NavBar() {
    const [show, setShow] = useState<boolean>(false)

    return (
        <div className="flex tablet:flex-row flex-col justify-between tablet:items-center bg-zinc-100 p-5 border-r tablet:border-r-0 tablet:border-b w-72 tablet:w-full h-dvh tablet:h-16">
            <Button onClick={() => setShow(!show)} size="icon" variant="ghost" className="tablet:flex hidden hover:bg-zinc-200">
                <Menu />
            </Button>

            <div className={cn("space-y-10 tablet:invisible tablet:absolute tablet:top-16 tablet:-left-96 transition-all tablet:bg-zinc-100 tablet:h-dvh tablet:w-72 tablet:border-r tablet:p-3", show && "tablet:visible tablet:left-0")}>
                <div>
                    logo
                </div>

                <nav className="flex flex-col gap-2">
                    <NavBarLink href="/dashboard" icon={Home} onClick={() => setShow(false)}>
                        Dashboard
                    </NavBarLink>

                    <NavBarLink href="/settings" icon={Settings} onClick={() => setShow(false)}>
                        Settings
                    </NavBarLink>
                </nav>
            </div>

            <NavBarUserPopover />
        </div>
    )
}