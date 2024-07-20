import { z } from "zod"
import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { getUser } from "@/actions/get-user"

const bodySchema = z.object({
    name: z.string().min(1).max(60)
})

export async function POST(request: Request) {
    const { data: body } = bodySchema.safeParse(await request.json())
    if (!body) {
        return new NextResponse("Bad request", { status: 400 })
    }

    const user = await getUser()
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!user) {
        return new NextResponse("User not found", { status: 404 })
    }

    const folder = await prisma.folder.create({
        data: {
            name: body.name,
            userId: user.id
        }
    })

    return NextResponse.json({ folder })
}