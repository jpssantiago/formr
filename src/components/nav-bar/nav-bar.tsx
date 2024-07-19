import { ChevronUp, Home, Menu, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MobileNavBarSheet } from "./mobile-nav-bar-sheet"
import { NavBarLink, NavBarLinkIcon, NavBarLinkText } from "./nav-bar-link"
import { NavBarPopover } from "./nav-bar-popover"

export function NavBar() {
    return (
        <div className="top-0 left-0 sticky flex navbar:flex-row flex-col justify-between navbar:items-center bg-zinc-100 p-5 w-72 navbar:w-full h-dvh navbar:h-16">
            <MobileNavBarSheet>
                <Button size="icon" variant="ghost" className="navbar:block hidden">
                    <Menu />
                </Button>
            </MobileNavBarSheet>

            <div className="space-y-8 navbar:hidden">
                <span className="font-bold text-2xl">
                    Formr
                </span>

                <nav className="flex flex-col gap-2">
                    <NavBarLink href="/dashboard">
                        <NavBarLinkIcon icon={Home} />
                        <NavBarLinkText>Dashboard</NavBarLinkText>
                    </NavBarLink>

                    <NavBarLink href="/settings">
                        <NavBarLinkIcon icon={Settings} />
                        <NavBarLinkText>Settings</NavBarLinkText>
                    </NavBarLink>
                </nav>
            </div>

            <NavBarPopover>
                <div className="flex justify-between navbar:justify-center items-center gap-5 bg-zinc-200 hover:bg-zinc-300 navbar:bg-zinc-100 px-2.5 rounded-sm h-10 text-zinc-600 hover:text-black transition-all navbar:size-10 cursor-pointer">
                    <p className="navbar:hidden text-sm truncate">
                        joao@joaosantiago.com.br
                    </p>

                    <ChevronUp 
                        size={16}
                        className="navbar:hidden"
                    />

                    <User 
                        className="navbar:block hidden"
                    />
                </div>
            </NavBarPopover>
        </div>
    )
}