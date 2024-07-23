"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Globe, Send } from "lucide-react"

import { LoadingButton } from "@/components/ui/loading-button"
import { FormPublishedDialog } from "./form-published-dialog"

type PublishFormButtonProps = {
    formId: string
}

export function PublishFormButton({ formId }: PublishFormButtonProps) { 
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isPublished, setIsPublished] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)

    async function onPublish() {
        if (isLoading) return

        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 3000))
        setIsLoading(false)

        setIsPublished(true)
        setOpen(true)
        toast.success("Changes published!")
    }

    return (
        <LoadingButton onClick={onPublish} loading={isLoading} disabled={isLoading || isPublished} className="flex items-center gap-3">
            {!isLoading && (
                isPublished ? (
                    <Globe  size={18} />
                ) : (
                    <Send size={18} />
                )
            )}

            {isPublished ? "Published" : "Publish"}

            <FormPublishedDialog
                open={open}
                setOpen={setOpen}
                formId={formId}
            />
        </LoadingButton>
    )
} 