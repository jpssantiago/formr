import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function getForms() {
    const session = await getServerSession(authOptions)

    if (!session?.user) return
    
    return await prisma.form.findMany({
        where: {
            author: {
                email: {
                    equals: session.user.email as string,
                    mode: "insensitive"
                }
            },
        },
        orderBy: {
            updatedAt: "desc"
        }
    })
}