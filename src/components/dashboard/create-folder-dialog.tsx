"use client"

import { ReactNode, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Folder } from "@prisma/client"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import { FolderService } from "@/services/folder-service"

const createFolderSchema = z.object({
    name: z.string().min(1, {
        message: "Every folder needs a name 😁."
    }).max(60, {
        message: "The name can't have more than 60 characters."
    })
})

type CreateFolderSchemaType = z.infer<typeof createFolderSchema>

type CreateFolderDialogProps = {
    children: ReactNode
    onCreateFolder?: (folder: Folder) => void
    asChild?: boolean
}

export function CreateFolderDialog({ children, onCreateFolder, asChild = false }: CreateFolderDialogProps) {
    const [show, setShow] = useState<boolean>(false)

    const { refresh } = useRouter()
    const { handleSubmit, register, formState, reset, setError } = useForm<CreateFolderSchemaType>({
        resolver: zodResolver(createFolderSchema)
    })

    const isLoading = formState.isSubmitting
    const hasErrors = formState.errors.root?.message || formState.errors.name?.message

    function onShowChange(status: boolean) {
        if (!status && isLoading) return

        if (!status) {
            reset()
        }

        setShow(status)
    }

    async function onSubmit({ name }: CreateFolderSchemaType) {
        if (isLoading) return

        const response = await FolderService.createFolder(name)
        if (response.err) {
            return setError("root", { message: response.err })
        }

        if (onCreateFolder && response.folder) {
            onCreateFolder(response.folder)
        }

        refresh()
        reset()
        setShow(false)
        toast.success(`The folder "${name}" was created.`)
    }

    return (
        <Dialog open={show} onOpenChange={onShowChange}>
            <DialogTrigger className="w-full" asChild={asChild}>
                {children}
            </DialogTrigger>

            <DialogContent className="rounded-lg">
                <DialogHeader className="items-start text-start">
                    <DialogTitle>
                        Create a new folder
                    </DialogTitle>

                    <DialogDescription>
                        You can add multiple forms inside a folder and keep
                        everything organized.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                        placeholder="Folder name"
                        {...register("name")}
                    />

                    <LoadingButton loading={isLoading}>
                        Create folder
                    </LoadingButton>
                </form>
            </DialogContent>
        </Dialog>
    )
} 