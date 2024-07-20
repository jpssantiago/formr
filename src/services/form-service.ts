import { Form } from "@prisma/client"

type DefaultFormResponse = {
    form?: Form
    err?: string
}

type MoveFormToFolderResponse = DefaultFormResponse

type RenameFormResponse = DefaultFormResponse

type DeleteFormResponse = DefaultFormResponse

type DuplicateFormResponse = DefaultFormResponse

export const FormService = {
    async moveFormToFolder(formId: string, folderId?: string): Promise<MoveFormToFolderResponse> {
        try {
            const response = await fetch(`/api/folder/${formId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    folderId
                })
            })

            const data = await response.json()
            return { form: data.form }
        } catch {
            return { err: "err" }
        }
    },

    async renameForm(formId: string, name: string): Promise<RenameFormResponse> {
        try {
            const response = await fetch(`/api/form/${formId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name })
            })

            const data = await response.json()

            return { form: data.form }
        } catch {
            return { err: "err" }
        }
    },

    async deleteForm(formId: string): Promise<DeleteFormResponse> {
        try {
            const response = await fetch(`/api/form/${formId}`, {
                method: "DELETE"
            })

            const data = await response.json()

            return { form: data.form }
        } catch {
            return { err: "err" }
        }
    },

    async duplicateForm(formId: string): Promise<DuplicateFormResponse> {
        try {   
            const response = await fetch(`/api/form/${formId}`, {
                method: "POST"
            })

            const data = await response.json()

            return { form: data.form }
        } catch {
            return { err: "err" }
        }
    }
}