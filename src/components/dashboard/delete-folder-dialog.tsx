"use client"

import { ReactNode, useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Folder } from "@prisma/client"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/ui/loading-button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FolderService } from "@/services/folder-service"

type DeleteFolderDialogProps = {
    folder: Folder
    children: ReactNode
}

export function DeleteFolderDialog({ folder, children }: DeleteFolderDialogProps) {
    const [open, setOpen] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const { refresh } = useRouter()

    function onOpenChange(status: boolean) {
        if (isLoading) return

        if (!status) setError("")

        setOpen(status)
    }

    async function onDelete() {
        setIsLoading(true)
        const response = await FolderService.deleteFolder(folder.id)
        setIsLoading(false)

        if (response.err) {
            return setError(response.err)
        }

        refresh()
        setOpen(false)
        toast.success(`The folder "${folder.name}" was deleted.`)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger>
                {children}
            </DialogTrigger>

            <DialogContent>
                <DialogHeader className="items-start text-start">
                    <DialogTitle>
                        Delete this folder?
                    </DialogTitle>
                    
                    <DialogDescription>
                        All the forms inside this folder will be moved to the
                        root directory and the folder will be deleted.<br/><br/>
                        This action is permanent.
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>
                            {error}
                        </AlertDescription>
                    </Alert>
                )}

                <DialogFooter className="flex-row justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary" className="hover:bg-zinc-200">
                            Cancel
                        </Button>
                    </DialogClose>

                    <LoadingButton onClick={onDelete} variant="destructive" loading={isLoading}>
                        Delete
                    </LoadingButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
} 