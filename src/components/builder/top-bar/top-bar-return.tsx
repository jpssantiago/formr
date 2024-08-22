"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

import { useFormBuilder } from "@/contexts/use-form-builder"

export function TopBarReturn() {
    const { push, refresh } = useRouter()
    const { saveForm } = useFormBuilder()

    function handleClick() {
        saveForm().then(() => {
            push("/dashboard")
            refresh()
        })
    }

    return (
        <div className="flex-1 medium:flex-auto medium:w-full">
            <div onClick={handleClick} className="flex items-center gap-2 w-fit text-zinc-600 hover:text-black transition-all hover:-translate-x-1 cursor-pointer">
                <ArrowLeft
                    size={20}
                />

                <p className="text-sm">
                    Go back
                </p>
            </div>
        </div>
    )
}