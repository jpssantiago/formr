import { z } from "zod"
import { NextResponse } from "next/server"

import { TQuestion } from "@/models/question"
import { getUser } from "@/actions/get-user"
import { getForm } from "@/actions/get-form"
import { prisma } from "@/lib/prisma"

const bodySchema = z.object({
    questions: z.array(z.custom<TQuestion>())
})

export async function PUT(request: Request, { params }: { params: { formId: string } }) {
    const user = await getUser()
    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const form = await getForm(params.formId)
    if (!form) {
        return new NextResponse("Form not found", { status: 404 })
    }

    const { data: body } = bodySchema.safeParse(await request.json())
    if (!body) {
        return new NextResponse("Bad request", { status: 400 })
    }

    const oldQuestions = await prisma.question.findMany({ where: { formId: form.id } })
    const newQuestionsIds = body.questions.map(q => q.id)

    for (let question of oldQuestions) {
        if (!newQuestionsIds.includes(question.id)) {
            await prisma.question.delete({ where: { id: question.id } })
        }
    }

    for (let question of body.questions) {
        const exists = await prisma.question.findUnique({ where: { id: question.id } })

        if (exists) {
            await prisma.question.update({
                where: {
                    id: question.id
                },
                data: {
                    ...question,
                    type: question.type.slug
                }
            })
        } else {
            await prisma.question.create({
                data: {
                    title: question.title,
                    description: question.description ?? "",
                    type: question.type.slug,
                    formId: params.formId,
                    order: question.order,
                    buttonText: question.buttonText,
                }
            })
        }
    }

    return NextResponse.json({ questions: body.questions })
}   