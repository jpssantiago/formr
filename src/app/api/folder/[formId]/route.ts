import { z } from "zod"
import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { getUser } from "@/actions/get-user"
import { getForm } from "@/actions/get-form"
import { getFolder } from "@/actions/get-folder"

const bodySchema = z.object({
    folderId: z.string().cuid().optional()
})

export async function POST(request: Request, { params }: { params: { formId: string } }) {
    const { data: body } = bodySchema.safeParse(await request.json())
    if (!body) {
        return new NextResponse("Bad request", { status: 400 })
    }

    const user = await getUser()
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const form = await getForm(params.formId)
    if (!form) {
        return new NextResponse("Form not found", { status: 404 })
    }

    if (form.authorId != user.id) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    if (body.folderId) {
        const folder = await getFolder(body.folderId)
        if (!folder) {
            return new NextResponse("Folder not found", { status: 404 })
        }

        if (folder.userId != user.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        return NextResponse.json({
            form: await prisma.form.update({
                data: {
                    folderId: body.folderId
                },
                where: {
                    id: params.formId
                }
            })
        })
    } else {
        return NextResponse.json({
            form: await prisma.form.update({
                data: {
                    folderId: null
                },
                where: {
                    id: params.formId
                }
            })
        })
    }
}