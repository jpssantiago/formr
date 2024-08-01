import { Folder } from "@prisma/client"

import { FolderCarouselItem } from "./folder-carousel-item"

type FolderListProps = {
    folders: Folder[]
    onSelectFolder: (folder: Folder) => void
    selectedFolder?: Folder
}

export function FolderList({ folders, onSelectFolder, selectedFolder }: FolderListProps) {
    return (
        <div className="space-y-2">
            <p className="text-[15px] text-zinc-800">
                Folders ({folders.length})
            </p>

            <div className="flex flex-wrap gap-2">
                {folders.map((folder) => (
                    <FolderCarouselItem
                        key={folder.id}
                        folder={folder}
                        onSelect={() => onSelectFolder(folder)}
                        isSelected={selectedFolder?.id == folder.id}
                    />
                ))}
            </div>
        </div>
    )
}