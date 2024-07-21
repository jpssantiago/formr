import { z } from "zod"
import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { getUser } from "@/actions/get-user"
import { getFolder } from "@/actions/get-folder"

const updateBodySchema = z.object({
    name: z.string().min(1).max(60)
})

export async function PUT(request: Request, { params }: { params: { folderId: string } }) {
    const user = await getUser()
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const { data: body } = updateBodySchema.safeParse(await request.json())
    if (!body) {
        return new NextResponse("Bad request", { status: 400 })
    }

    const folder = await getFolder(params.folderId)
    if (!folder) {
        return new NextResponse("Folder not found", { status: 404 })
    }

    if (folder.userId != user.id) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const newFolder = await prisma.folder.update({
        data: {
            name: body.name
        },
        where: { id: folder.id }
    })

    return NextResponse.json({ newFolder })
}

export async function DELETE(_: Request, { params }: { params: { folderId: string } }) {
    const user = await getUser()
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const folder = await getFolder(params.folderId)
    if (!folder) {
        return new NextResponse("Folder not found", { status: 404 })
    }

    if (folder.userId != user.id) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    await prisma.form.updateMany({
        data: {
            folderId: null
        },
        where: {
            folderId: folder.id
        }
    })

    await prisma.folder.delete({
        where: { id: folder.id }
    })

    return NextResponse.json({ folder })
}