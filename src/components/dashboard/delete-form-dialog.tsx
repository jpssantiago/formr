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
    DialogDescription,
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

type DeleteFormDialogProps = {
    form: Form
    children?: ReactNode
    onClose: () => void
}

export function DeleteFormDialog({ form, children, onClose }: DeleteFormDialogProps) {
    const [show, setShow] = useState<boolean>(false)

    const deleteFormSchema = z.object({
        formName: z.string().refine(val => val == form.name)
    })

    type DeleteFormSchemaType = z.infer<typeof deleteFormSchema>

    const { refresh } = useRouter()
    const { handleSubmit, register, formState, reset, setError } = useForm<DeleteFormSchemaType>({
        resolver: zodResolver(deleteFormSchema)
    })

    const isLoading = formState.isSubmitting
    const hasErrors = formState.errors.root?.message || formState.errors.formName?.message

    function onShowChange(status: boolean) {
        if (!status && isLoading) {
            return
        }

        if (!status) {
            reset()
            onClose()
        }

        setShow(status)
    }

    async function onSubmit({}: DeleteFormSchemaType) {
        if (isLoading) return

        const response = await FormService.deleteForm(form.id)
        if (response.err) {
            return setError("root", { message: response.err })
        }

        refresh()
        setShow(false)
        toast.success("The form was deleted from our servers.")
        onClose()
    }

    return (
        <Dialog open={show} onOpenChange={onShowChange}>
            <DialogTrigger className="w-full">
                {children}
            </DialogTrigger>

            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <DialogHeader className="items-start text-start">
                        <DialogTitle>
                            Delete form and responses?
                        </DialogTitle>

                        <DialogDescription>
                            You&apos;re about to delete <span className="font-medium text-black">{form.name}</span>. <br />
                            All responses this form has collected will also be
                            deleted forever. <br /><br />
                            To confirm, enter the name of this form:
                        </DialogDescription>
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
                        placeholder={form.name}
                        {...register("formName")}
                    />

                    <DialogFooter className="flex-row justify-end gap-2">
                        <DialogClose asChild>
                            <Button type="reset" variant="secondary" className="bg-zinc-200 hover:bg-zinc-300">
                                Cancel
                            </Button>
                        </DialogClose>

                        <LoadingButton loading={isLoading} className="w-fit" variant="destructive" disabled={!formState.isValid}>
                            Yes, delete it
                        </LoadingButton>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}