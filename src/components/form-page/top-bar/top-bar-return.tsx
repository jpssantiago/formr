import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function TopBarReturn() {
    return (
        <div className="flex-1">
            <Link href="/dashboard" className="flex items-center gap-2 w-fit text-zinc-600 hover:text-black transition-all hover:-translate-x-1">
                <ArrowLeft
                    size={20}
                />

                <p className="text-sm">
                    Go back
                </p>
            </Link>
        </div>
    )
}