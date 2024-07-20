"use client"

import { ReactNode, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { FolderPlus } from "lucide-react"

import { Folder, Form } from "@prisma/client"
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
import { CreateFolderDialog } from "./create-folder-dialog"
import { FormService } from "@/services/form-service"

type MoveFormToFolderSheetProps = {
    form: Form
    children: ReactNode
    onCloseSheet: () => void
}

export function MoveFormToFolderSheet({ form, children, onCloseSheet }: MoveFormToFolderSheetProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [folders, setFolders] = useState<Folder[] | undefined>()
    const [selectedFolder, setSelectedFolder] = useState<string | undefined>(form.folderId ?? undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { refresh } = useRouter()

    useEffect(() => {
        fetch("/api/folders")
            .then(response => response.json())
            .then(data => {
                setFolders(data.folders)
            })
            .catch(() => {
                toast.error("There was an unknown error. Please try again later.")
            }
            )
    }, [])

    function onOpenChange(status: boolean) {
        if (!status && isLoading) {
            return
        }

        if (!status) {
            onCloseSheet()
        }

        setOpen(status)
    }

    function onSelect(folder: Folder) {
        setSelectedFolder(selectedFolder == folder.id ? undefined : folder.id)
    }

    async function onSave() {
        if (isLoading) return

        setIsLoading(true)
        const response = await FormService.moveFormToFolder(form.id, selectedFolder)
        setIsLoading(false)

        if (response.err) {
            return toast.error(response.err)
        }

        refresh()
        setOpen(false)
        onCloseSheet()
        if (selectedFolder) {
            const folderName = folders?.find(f => f.id == selectedFolder)?.name
            toast.success(`The form was moved to the folder "${folderName}".`)
        } else {
            toast.success(`The form was removed from its folder.`)
        }
    }

    function onCreateFolder(folder: Folder) {
        if (folders) {
            setFolders([...folders, folder])
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
                    {folders?.map((folder, index) => (
                        <FolderListItem
                            key={index}
                            folder={folder}
                            isSelected={selectedFolder == folder.id}
                            onSelect={() => onSelect(folder)}
                        />
                    ))}

                    <CreateFolderDialog onCreateFolder={onCreateFolder}>
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