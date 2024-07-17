import { ElementType, ReactNode } from "react"

import { Button, ButtonProps } from "./ui/button"

type AuthProviderButtonProps = ButtonProps & {
    icon: ElementType
    children?: ReactNode
}

export function AuthProviderButton({ icon: Icon, children, ...rest }: AuthProviderButtonProps) {
    return (
        <Button variant="secondary" className="flex items-center gap-2 hover:bg-zinc-200 border" {...rest}>
            <Icon className="size-5" />

            {children}
        </Button>
    )
}