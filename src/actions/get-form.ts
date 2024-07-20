import { prisma } from "@/lib/prisma"
import { Form } from "@prisma/client"

export async function getForm(id: string): Promise<Form | undefined> {    
    return await prisma.form.findUnique({
        where: {
            id
        }
    }) ?? undefined
}