"use client"

import { ReactNode, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"

const createFolderSchema = z.object({
    name: z.string().min(1, {
        message: "Every folder needs a name 😁."
    }).max(50, {
        message: "The name can't have more than 50 characters."
    })
})

type CreateFolderSchemaType = z.infer<typeof createFolderSchema>

type CreateFolderDialogProps = {
    children: ReactNode
}

export function CreateFolderDialog({ children }: CreateFolderDialogProps) {
    const [show, setShow] = useState<boolean>(false)

    const { handleSubmit, register, formState, reset } = useForm<CreateFolderSchemaType>({
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

        await new Promise(resolve => setTimeout(resolve, 1500))

        reset()
        setShow(false)
        toast.success(`The folder "${name}" was created.`)
    }

    return (
        <Dialog open={show} onOpenChange={onShowChange}>
            <DialogTrigger asChild>
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