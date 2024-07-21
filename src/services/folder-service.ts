import { Folder } from "@prisma/client"

type CreateFolderResponse = {
    folder?: Folder
    err?: string
}

type RenameFolderResponse = {
    folder?: String
    err?: string
}

type DeleteFolderResponse = {
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
        } catch {
            return { err: "server-not-responding" }
        }
    },

    async renameFolder(id: string, name: string): Promise<RenameFolderResponse> {
        try {
            const response = await fetch(`/api/folder/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({ name })
            })
            
            const data = await response.json()
            return { folder: data.folder }
        } catch {
            return { err: "server-not-responding" }
        }
    },
    
    async deleteFolder(id: string): Promise<DeleteFolderResponse> {
        try {
            const response = await fetch(`/api/folder/${id}`, {
                method: "DELETE"
            })

            const data = await response.json()
            return { folder: data.folder }
        } catch {
            return { err: "server-not-responding" }
        }
    }
}