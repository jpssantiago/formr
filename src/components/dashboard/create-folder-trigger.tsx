import { FolderPlus } from "lucide-react";

export function CreateFolderTrigger() {
    return (
        <div className="flex items-center gap-3 bg-zinc-100 hover:bg-zinc-100 px-3 border rounded-lg w-full h-10 text-zinc-600 hover:text-black transition-all cursor-pointer">
            <FolderPlus
                size={20}
            />

            <p className="text-sm">
                Create a new folder
            </p>
        </div>
    )
}