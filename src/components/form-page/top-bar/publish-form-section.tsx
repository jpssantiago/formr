"use client"

import { Loader } from "lucide-react"

import { useCreateForm } from "@/contexts/create-form-context"
import { cn } from "@/lib/utils"
import { PublishFormButton } from "./publish-form-button"

export function PublishFormSection({ formId }: { formId: string }) {
    const { isSaving } = useCreateForm()
    
    return (
        <div className="flex flex-1 medium:flex-auto justify-end items-center gap-5 medium:w-fit">
            <div className={cn("items-center duration-300 opacity-0 flex gap-2 text-blue-500 transition-all invisible", isSaving && "opacity-1 visible")}>
                <Loader
                    size={16}
                    className="animate-spin"
                />

                <p className="text-sm">
                    Saving...
                </p>
            </div>

            <PublishFormButton
                formId={formId}
            />
        </div>
    )
}