import { prisma } from "@/lib/prisma"

export async function getFolder(id: string) {
    return prisma.folder.findUnique({
        where: { id }
    })
}