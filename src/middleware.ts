import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

import { env } from "@/env/env"

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: env.NEXTAUTH_SECRET })
    const path = request.nextUrl.pathname

    if (!token?.email && path !== "/auth") {
        //return NextResponse.redirect(new URL("/auth", request.url))
    }

    if (token?.email && path == "/auth") {
        //return NextResponse.redirect(new URL("/dashboard", request.url))
    }
}

export const config = {
    matcher: '/auth'
}