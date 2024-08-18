"use client"

import { Loader } from "lucide-react"

import { useFormBuilder } from "@/contexts/use-form-builder"
import { cn } from "@/lib/utils"
import { PublishFormButton } from "./publish-form-button"

export function PublishFormSection({ formId }: { formId: string }) {
    const { isSaving } = useFormBuilder()
    
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