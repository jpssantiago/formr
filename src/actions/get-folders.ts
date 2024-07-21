import { getUser } from "./get-user"
import { prisma } from "@/lib/prisma"

export async function getFolders() {
    const user = await getUser()

    return await prisma.folder.findMany({
        where: {
            userId: user?.id
        },
        orderBy: {
            createdAt: "asc"
        }
    })
}