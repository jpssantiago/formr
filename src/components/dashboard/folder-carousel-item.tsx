"use client"

import { Folder as FolderIcon, FolderOpen} from "lucide-react"

import { cn } from "@/lib/utils"
import { Folder } from "@prisma/client"

type FolderCarouselItemProps = {
    folder: Folder
    onSelect: () => void
    isSelected: boolean
}

export function FolderCarouselItem({ folder, onSelect, isSelected }: FolderCarouselItemProps) {
    return (
        <div 
            onClick={onSelect} 
            className={cn("flex gap-2 justify-center items-center bg-zinc-100 hover:bg-zinc-50 hover:border-zinc-300 px-5 rounded-lg h-10 text-sm text-zinc-600 hover:text-black transition-all cursor-pointer border border-transparent", isSelected && "border-blue-500 text-blue-500 hover:text-blue-500 hover:border-blue-500 bg-zinc-50")}
        >
            {isSelected ? (
                <FolderOpen size={20} />
            ) : (
                <FolderIcon size={20} />
            )}

            <p>
                {folder.name}
            </p>
        </div>
    )
}