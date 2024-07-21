"use client"

import { Check, Folder as FolderIcon } from "lucide-react"

import { Folder } from "@prisma/client"
import { cn } from "@/lib/utils"

type FolderListItemProps = {
    folder: Folder
    isSelected: boolean
    onSelect: () => void
}

export function FolderListItem({ folder, isSelected, onSelect }: FolderListItemProps) {
    return (
        <div onClick={onSelect} className={cn("flex justify-between items-center hover:bg-zinc-100 px-3 border rounded-lg h-10 text-zinc-600 hover:text-black transition-all cursor-pointer", isSelected && "border-blue-500 text-blue-500 hover:text-blue-500")}>
            <div className="flex items-center gap-3">
                <FolderIcon
                    size={20}
                />

                <p className="text-sm">
                    {folder.name}
                </p>
            </div>

            <Check 
                size={20}
                className={cn("opacity-0 transition-opacity text-blue-500", isSelected && "opacity-1")}
            />
        </div>
    )
}