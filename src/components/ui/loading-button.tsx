import { Loader2 } from "lucide-react"

import { Button, ButtonProps } from "./button"
import { cn } from "@/lib/utils"

type LoadingButtonProps = ButtonProps & {
    loading: boolean
}

export function LoadingButton({ loading, ...rest }: LoadingButtonProps) {
    return (
        <Button {...rest} disabled={loading || rest.disabled} className={cn("flex gap-2 items-center", rest.className)}>
            {loading && (
                <Loader2
                    className="transition-all animate-spin"
                    size={20}
                />
            )}

            {rest.children}
        </Button>
    )
}