import { NextResponse } from "next/server"

import { getUser } from "@/actions/get-user"
import { prisma } from "@/lib/prisma"

export async function POST() {
    const user = await getUser()
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const form = await prisma.form.create({
        data: {
            name: "My new form",
            authorId: user.id,
        }
    })

    if (!form) {
        return new NextResponse("Form not created", { status: 500 })
    }
    
    const question = await prisma.question.create({
        data: {
            title: "",
            description: "",
            order: 0,
            buttonText: "Continue",
            type: "shortText",
            formId: form.id
        }
    })
    
    if (!question) {
        return new NextResponse("First question not created", { status: 500 })
    }

    return NextResponse.json({ form: {
        ...form,
        questions: [
            question
        ]
    } })
}