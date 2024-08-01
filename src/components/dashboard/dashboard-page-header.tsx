"use client"

import { Folder } from "@prisma/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { FormService } from "@/services/form-service"
import { LoadingButton } from "@/components/ui/loading-button"
import { ManageFoldersDialog } from "./manage-folders-dialog"
import { Button } from "@/components/ui/button"

type DashboardClientPageProps = {
    folders: Folder[]
}

export function DashboardPageHeader({ folders }: DashboardClientPageProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { push } = useRouter()

    async function onCreateForm() {
        if (isLoading) return

        setIsLoading(true)
        const response = await FormService.createForm()
        setIsLoading(false)

        if (response.err) {
            return toast.error(response.err)
        }

        if (response.form) {
            push(`/form/${response.form.id}`)
        }
    }

    return (
        <div className="flex small:flex-col justify-between items-center gap-10 w-full">
            <div className="space-y-1 small:text-center">
                <h1 className="font-semibold text-2xl">
                    All forms
                </h1>

                <p className="text-[15px] text-zinc-600">
                    Manage all your forms / surveys in one place.
                </p>
            </div>

            <div className="flex medium:flex-col-reverse gap-2">
                <LoadingButton loading={isLoading} onClick={onCreateForm} className="medium:w-full">
                    Create a new form
                </LoadingButton>

                <ManageFoldersDialog folders={folders}>
                    <Button variant="outline">
                        Manage folders
                    </Button>
                </ManageFoldersDialog>
            </div>
        </div>
    )
}