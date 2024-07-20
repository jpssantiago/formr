import { z } from "zod"
import { NextResponse } from "next/server"

import { getUser } from "@/actions/get-user"
import { prisma } from "@/lib/prisma"
import { getForm } from "@/actions/get-form"

// Duplicate form
export async function POST(_: Request, { params }: { params: { formId: string } }) {
    const user = await getUser()
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const referenceForm = await getForm(params.formId)
    if (!referenceForm) {
        return new NextResponse("Form not found", { status: 404 })
    }

    const form = await prisma.form.create({
        data: {
            name: referenceForm.name,
            folderId: referenceForm.folderId,
            isPublished: referenceForm.isPublished,
            authorId: user.id
        }
    })

    return NextResponse.json(form)
}

const putBodySchema = z.object({
    name: z.string().min(1).max(60)
})

// Update form
export async function PUT(request: Request, { params }: { params: { formId: string } }) {    
    const { data: body } = putBodySchema.safeParse(await request.json())
    if (!body) {
        return new NextResponse("Bad request", { status: 400 })
    }

    const user = await getUser()
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const form = await prisma.form.update({
        where: {
            id: params.formId
        },
        data: {
            name: body.name
        }
    })

    return NextResponse.json({ form })
} 

// Delete form
export async function DELETE(_: Request, { params }: { params: { formId: string } }) {
    const user = await getUser()
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const form = await getForm(params.formId)
    if (!form) {
        return new NextResponse("Form not found", { status: 401 })
    }

    if (form.authorId != user.id) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    await prisma.form.delete({
        where: {
            id: params.formId
        }
    })

    return NextResponse.json({ form })
}