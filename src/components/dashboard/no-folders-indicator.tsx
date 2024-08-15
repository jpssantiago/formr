import { FolderOpen } from "lucide-react"

export function NoFormsOnFolderIndicator() {
    return (
        <div className="flex flex-col items-center gap-3 w-full text-center">
            <FolderOpen
                size={36}
            />

            <div className="space-y-1">
                <p className="font-medium text-sm">
                    This folder is empty
                </p>

                <span className="text-sm text-zinc-500">
                    Move forms into this folder to see them here
                </span>
            </div>
        </div>
    )
}