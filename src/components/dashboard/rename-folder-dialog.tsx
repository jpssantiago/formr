"use client"

import { ReactNode, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Folder } from "@prisma/client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FolderService } from "@/services/folder-service"

type RenameFolderDialogProps = {
    folder: Folder
    children: ReactNode
}

export function RenameFolderDialog({ folder, children }: RenameFolderDialogProps) {
    const [open, setOpen] = useState<boolean>(false)

    const renameFolderSchema = z.object({
        name: z.string().min(1, {
            message: "Every folder needs a name 😁."
        }).max(60, {
            message: "The name can't have more than 60 characters."
        })
    })

    type RenameFolderSchemaType = z.infer<typeof renameFolderSchema>

    const { refresh } = useRouter()
    const { handleSubmit, register, formState, reset, setError } = useForm<RenameFolderSchemaType>({
        resolver: zodResolver(renameFolderSchema),
        defaultValues: {
            name: folder.name
        }
    })
    
    const isLoading = formState.isSubmitting
    const hasErrors = formState.errors.root?.message || formState.errors.name?.message

    function onOpenChange(status: boolean) {
        if (isLoading) return

        if (!status) reset()

        setOpen(status)
    }

    async function onSubmit({ name }: RenameFolderSchemaType) {
        if (isLoading) return

        const response = await FolderService.renameFolder(folder.id, name)
        if (response.err) {
            return setError("root", { message: response.err })
        }

        refresh()
        setOpen(false)
        toast.success(`The folder was renamed to "${name}".`)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger className="w-full">
                {children}
            </DialogTrigger>

            <DialogContent aria-describedby={undefined}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <DialogHeader className="items-start text-start">
                        <DialogTitle>Rename this folder</DialogTitle>
                    </DialogHeader>

                    {hasErrors && (
                        <Alert variant="destructive">
                            <AlertDescription>
                                {formState.errors.root?.message}
                            </AlertDescription>

                            <AlertDescription>
                                {formState.errors.name?.message}
                            </AlertDescription>
                        </Alert>
                    )}

                    <Input 
                        placeholder="New name"
                        {...register("name")}
                    />

                    <LoadingButton loading={isLoading}>
                        Rename
                    </LoadingButton>
                </form>
            </DialogContent>
        </Dialog>
    )
}