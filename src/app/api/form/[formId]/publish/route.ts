import { NextResponse } from "next/server"

import { getUser } from "@/actions/get-user"
import { getForm } from "@/actions/get-form"
import { prisma } from "@/lib/prisma"

export async function PUT(_: Request, { params }: { params: { formId: string } }) {
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

    const newForm = await prisma.form.update({
        where: {
            id: form.id
        },
        data: {
            isPublished: !form.isPublished
        }
    })

    return NextResponse.json({ form: newForm })
}   