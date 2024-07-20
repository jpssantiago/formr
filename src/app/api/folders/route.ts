import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    try {
        const folders = await prisma.folder.findMany({
            where: {
                user: {
                    email: {
                        equals: session.user!.email as string,
                        mode: "insensitive"
                    }
                }
            }
        })

        return NextResponse.json({ folders })
    } catch {
        return new NextResponse("Unknown error", { status: 500 })
    }
}