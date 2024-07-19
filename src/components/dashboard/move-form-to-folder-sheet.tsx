"use client"

import { ReactNode, useState } from "react"

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import { FolderListItem } from "./folder-list-item"
import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/ui/loading-button"
import { toast } from "sonner"
import { CreateFolderDialog } from "./create-folder-dialog"
import { FolderPlus } from "lucide-react"

type MoveFormToFolderSheetProps = {
    children: ReactNode
    onCloseSheet: () => void
}

const folders: string[] = ["folder 1", "folder 2", "folder 3", "folder 4"]

export function MoveFormToFolderSheet({ children, onCloseSheet }: MoveFormToFolderSheetProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [selectedFolder, setSelectedFolder] = useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    

    function onOpenChange(status: boolean) {
        if (!status && isLoading) {
            return
        }

        if (!status) {
            onCloseSheet()
        }

        setOpen(status)
    } 

    function onSelect(folder: string) {
        setSelectedFolder(selectedFolder == folder ? undefined : folder)
    }

    async function onSave() {
        if (isLoading) return

        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsLoading(false)

        setOpen(false)
        onCloseSheet()
        if (selectedFolder) {
            toast.success(`The form was added to the folder "${selectedFolder}".`)
        } else {
            toast.success(`The form was removed from its folder.`)
        }
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger className="w-full">
                {children}
            </SheetTrigger>

            <SheetContent className="flex flex-col gap-5 w-[400px] sm:w-[540px]" aria-describedby={undefined}>
                <SheetHeader className="items-start text-start">
                    <SheetTitle>Move form to...</SheetTitle>
                </SheetHeader>

                <div className="space-y-2">
                    {folders.map((folder, index) => (
                        <FolderListItem 
                            key={index}
                            folder={folder}
                            isSelected={selectedFolder == folder}
                            onSelect={() => onSelect(folder)}
                        />
                    ))}

                    <CreateFolderDialog>
                        <div className="flex items-center gap-3 bg-zinc-100 hover:bg-zinc-100 px-3 border rounded-lg w-full h-10 text-zinc-600 hover:text-black transition-all cursor-pointer">
                            <FolderPlus 
                                size={20}
                            />

                            <p className="text-sm">
                                Create a new folder
                            </p>
                        </div>
                    </CreateFolderDialog>
                </div>

                <SheetFooter className="flex-row gap-3 self-end">
                    <SheetClose asChild>
                        <Button variant="secondary" className="bg-zinc-200 hover:bg-zinc-300">
                            Cancel
                        </Button>
                    </SheetClose>

                    <LoadingButton loading={isLoading} onClick={onSave}>
                        Save
                    </LoadingButton>
                </SheetFooter>
            </SheetContent>
        </Sheet>   
    )
}