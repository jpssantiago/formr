"use client"

import { Check, Folder } from "lucide-react"

import { cn } from "@/lib/utils"

type FolderListItemProps = {
    folder: string
    isSelected: boolean
    onSelect: () => void
}

export function FolderListItem({ folder, isSelected, onSelect }: FolderListItemProps) {
    return (
        <div onClick={onSelect} className={cn("flex justify-between items-center hover:bg-zinc-100 px-3 border rounded-lg h-10 text-zinc-600 hover:text-black transition-all cursor-pointer", isSelected && "border-emerald-500 text-emerald-500 hover:text-emerald-500")}>
            <div className="flex items-center gap-3">
                <Folder
                    size={20}
                />

                <p className="text-sm">
                    {folder}
                </p>
            </div>

            <Check 
                size={20}
                className={cn("opacity-0 transition-opacity text-emerald-500", isSelected && "opacity-1")}
            />
        </div>
    )
}