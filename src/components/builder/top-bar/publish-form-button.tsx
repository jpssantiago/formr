"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Globe, GlobeLock } from "lucide-react"

import { LoadingButton } from "@/components/ui/loading-button"
import { FormPublishedDialog } from "./form-published-dialog"
import { useCreateForm } from "@/contexts/create-form-context"

type PublishFormButtonProps = {
    formId: string
}

export function PublishFormButton({ formId }: PublishFormButtonProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    const { form, publishForm } = useCreateForm()

    async function onPublish() {
        if (isLoading) return

        setIsLoading(true)
        const response = await publishForm()
        setIsLoading(false)

        if (response.err) {
            return toast.error(response.err)
        }

        if (response.form?.isPublished) {
            setOpen(true)
        }

        toast.success(`The form is now ${response.form?.isPublished ? "public" : "private"}.`)
    }

    return (
        <>
            <LoadingButton onClick={onPublish} loading={isLoading} disabled={isLoading} className="flex items-center gap-3">
                {!isLoading && (
                    form?.isPublished ? (
                        <GlobeLock size={18} />
                    ) : (
                        <Globe size={18} />
                    )
                )}

                {form?.isPublished ? "Unpublish" : "Publish"}

            </LoadingButton>

            <FormPublishedDialog
                open={open}
                setOpen={setOpen}
                formId={formId}
            />
        </>
    )
} 