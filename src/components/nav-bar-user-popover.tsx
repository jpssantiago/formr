import { ChevronUp, LogOut, User } from "lucide-react"
import { signOut } from "next-auth/react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverItem } from "@/components/popover-item"

export function NavBarUserPopover() {
    function handleSignOut() {
        signOut()
    }

    return (
        <Popover>
            <PopoverTrigger>
                <div className="flex justify-between items-center hover:bg-zinc-200 px-3 rounded-lg h-10 transition-all">
                    <div className="flex items-center gap-2">
                        <div className="border-zinc-800 p-1 border rounded-full text-zinc-800">
                            <User
                                size={16}
                            />
                        </div>

                        <p className="tablet:hidden font-medium text-sm">
                            email@provider.com
                        </p>
                    </div>

                    <ChevronUp
                        size={20}
                        className="tablet:hidden"
                    />
                </div>
            </PopoverTrigger>

            <PopoverContent className="p-0 w-fit">
                <PopoverItem icon={LogOut} onClick={handleSignOut}>
                    Sign out
                </PopoverItem>
            </PopoverContent>
        </Popover>
    )
}