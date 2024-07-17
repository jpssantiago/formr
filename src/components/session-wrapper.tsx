"use client"

import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"

type SessionWrapperProps = {
    children?: ReactNode
}

export function SessionWrapper({ children }: SessionWrapperProps) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}