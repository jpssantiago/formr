"use client"

import { ReactNode, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { Form } from "@prisma/client"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { LoadingButton } from "@/components/ui/loading-button"
import { FormService } from "@/services/form-service"

type RenameFormDialogProps = {
    form: Form
    children: ReactNode
    onClose: () => void
}

export function RenameFormDialog({ form, children, onClose }: RenameFormDialogProps) {
    const renameFormSchema = z.object({
        formName: z.string().min(1, {
            message: "Every form needs a name 😁."
        }).max(60, {
            message: "The name can't have more than 60 characters."
        }).refine(val => val != form.name, {
            message: "The new name can't be the same as the old one."
        })
    })

    type RenameFormSchemaType = z.infer<typeof renameFormSchema>

    const [show, setShow] = useState<boolean>(false)

    const { refresh } = useRouter()
    const { handleSubmit, register, formState, reset, setError } = useForm<RenameFormSchemaType>({
        resolver: zodResolver(renameFormSchema),
        defaultValues: {
            formName: form.name
        }
    })

    const isLoading = formState.isSubmitting
    const hasErrors = formState.errors.root?.message || formState.errors.formName?.message

    function onShowChange(status: boolean) {
        if (!status && isLoading) return

        if (!status) {
            reset()
            onClose()
        }

        setShow(status)
    }

    async function onSubmit({ formName }: RenameFormSchemaType) {
        const response = await FormService.renameForm(form.id, formName)
        if (response.err) {
            return setError("root", { message: response.err })
        }

        refresh()
        setShow(false)
        onClose()
        toast.success(`The form was renamed to "${formName}".`)
    }

    return (
        <Dialog open={show} onOpenChange={onShowChange}>
            <DialogTrigger className="w-full">
                {children}
            </DialogTrigger>

            <DialogContent aria-describedby={undefined}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <DialogHeader className="items-start text-start">
                        <DialogTitle>Rename this form</DialogTitle>
                    </DialogHeader>

                    {hasErrors && (
                        <Alert variant="destructive">
                            <AlertDescription>
                                {formState.errors.root?.message}
                            </AlertDescription>

                            <AlertDescription>
                                {formState.errors.formName?.message}
                            </AlertDescription>
                        </Alert>
                    )}

                    <Input
                        placeholder="New name"
                        {...register("formName")}
                    />

                    <DialogFooter className="flex-row justify-end gap-2">
                        <DialogClose asChild>
                            <Button variant="secondary" className="bg-zinc-200 hover:bg-zinc-300">
                                Cancel
                            </Button>
                        </DialogClose>

                        <LoadingButton loading={isLoading}>
                            Rename
                        </LoadingButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}