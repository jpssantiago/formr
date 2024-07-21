import { ReactNode } from "react"
import { FolderPlus, Pen, Trash2 } from "lucide-react"

import { Folder } from "@prisma/client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { DeleteFolderDialog } from "./delete-folder-dialog"
import { RenameFolderDialog } from "./rename-folder-dialog"
import { CreateFolderDialog } from "./create-folder-dialog"
import { CreateFolderTrigger } from "./create-folder-trigger"

type ManageFoldersDialogProps = {
    folders: Folder[]
    children: ReactNode
}

export function ManageFoldersDialog({ folders, children }: ManageFoldersDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="space-y-4" aria-describedby={undefined}>
                <DialogHeader className="items-start text-start">
                    <DialogTitle>
                        Manage all your folders
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-2">
                    {folders.map(folder => (
                        <Item
                            key={folder.id}
                            folder={folder}
                        />
                    ))}

                    <CreateFolderDialog>
                        <CreateFolderTrigger />
                    </CreateFolderDialog>
                </div>
            </DialogContent>
        </Dialog>
    )
}

function Item({ folder }: { folder: Folder }) {
    return (
        <div className="flex justify-between items-center px-3 border rounded-lg h-10">
            <p className="text-sm text-zinc-600">
                {folder.name}
            </p>

            <div className="flex gap-2">
                <RenameFolderDialog folder={folder}>
                    <FolderAction>
                        <Pen
                            size={18}
                            className="group-hover:text-black text-zinc-500 transition-colors"
                        />
                    </FolderAction>
                </RenameFolderDialog>

                <DeleteFolderDialog folder={folder}>
                    <FolderAction className="hover:bg-destructive/20">
                        <Trash2
                            size={18}
                            className="text-destructive"
                        />
                    </FolderAction>
                </DeleteFolderDialog>
            </div>
        </div>
    )
}

export function FolderAction({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <div className={cn("flex group justify-center items-center bg-zinc-100 hover:bg-zinc-200 p-1.5 rounded-full transition-all cursor-pointer", className)}>
            {children}
        </div>
    )
}