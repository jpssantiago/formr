import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFoundPage() {
    return (
        <div className="flex flex-col justify-center items-center gap-5 h-dvh text-center">
            <h1 className="font-bold text-8xl">
                404
            </h1>

            <div className="flex flex-col items-center gap-3">
                <p className="text-zinc-600">
                    Oooops, this page does not exist.
                </p>

                <Link href="/">
                    <Button>
                        Go back to home
                    </Button>
                </Link>
            </div>
        </div>
    )
}