import { Folder } from "@prisma/client"

type CreateFolderResponse = {
    folder?: Folder
    err?: string
}

export const FolderService = {
    async createFolder(name: string): Promise<CreateFolderResponse> {
        try {
            const response = await fetch(`/api/folder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name })
            })
            
            const data = await response.json()

            return { folder: data.folder }
        } catch (err) {
            console.log(err)
            return { err: "err" }
        }
    }
}