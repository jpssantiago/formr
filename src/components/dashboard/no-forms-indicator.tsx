import { FileType } from "lucide-react"

export function NoFormsIndicator() {
    return (
        <div className="flex flex-col items-center gap-3 w-full text-center">
            <FileType
                size={36}
            />

            <div className="space-y-1">
                <p className="font-medium text-sm">
                    It looks like you haven&apos;t created any form
                </p>

                <span className="text-sm text-zinc-500">
                    Get started by creating your first form
                </span>
            </div>
        </div>
    )
}