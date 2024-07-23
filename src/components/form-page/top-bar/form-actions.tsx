import { Plus } from "lucide-react"

import { IconButton } from "@/components/ui/icon-button"

export function FormActions() {
    return (
        <div className="flex items-center bg-zinc-100 px-3 py-2 rounded-lg w-full">
            <IconButton icon={Plus} variant="outline" className="h-9">
                Add question
            </IconButton>
        </div>
    )
}