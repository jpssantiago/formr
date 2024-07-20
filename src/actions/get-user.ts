import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { User } from "@prisma/client"
import { prisma } from "@/lib/prisma"

export async function getUser(): Promise<User | undefined> {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return
    }

    return await prisma.user.findFirst({
        where: {
            email: {
                equals: session.user.email as string,
                mode: "insensitive"
            }
        }
    }) ?? undefined
}