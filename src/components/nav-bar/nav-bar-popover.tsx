import { ReactNode } from "react"
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverItem, PopoverItemIcon, PopoverItemText } from "@/components/ui/popover-item"

type NavBarPopoverProps = {
    children: ReactNode
}

export function NavBarPopover({ children }: NavBarPopoverProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>

            <PopoverContent className="space-y-1 p-1 w-60">
                <PopoverItem onClick={signOut}>
                    <PopoverItemIcon icon={LogOut} />
                    <PopoverItemText>Sign out</PopoverItemText>
                </PopoverItem>
            </PopoverContent>
        </Popover>
    )
}