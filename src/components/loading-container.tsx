import { Loader2 } from "lucide-react"

export function LoadingContainer() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader2
                size={32}
                className="text-blue-500 transition-all animate-spin"
            />
        </div>
    )
}