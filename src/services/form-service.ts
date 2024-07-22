import { Form } from "@prisma/client"

type FormResponse = {
    form?: Form
    err?: string
}

export const FormService = {
    async moveFormToFolder(formId: string, folderId?: string): Promise<FormResponse> {
        try {
            const response = await fetch(`/api/form/${formId}/folder`, {
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
            return { err: "server-not-responding" }
        }
    },

    async renameForm(formId: string, name: string): Promise<FormResponse> {
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
            return { err: "server-not-responding" }
        }
    },

    async deleteForm(formId: string): Promise<FormResponse> {
        try {
            const response = await fetch(`/api/form/${formId}`, {
                method: "DELETE"
            })

            const data = await response.json()

            return { form: data.form }
        } catch {
            return { err: "server-not-responding" }
        }
    },

    async duplicateForm(formId: string): Promise<FormResponse> {
        try {   
            const response = await fetch(`/api/form/${formId}`, {
                method: "POST"
            })

            const data = await response.json()

            return { form: data.form }
        } catch {
            return { err: "server-not-responding" }
        }
    },

    async createForm(): Promise<FormResponse> {
        try {
            const response = await fetch("/api/form", {
                method: "POST"
            })

            const data = await response.json()
            return { form: data.form }
        } catch {
            return { err: "server-not-responding" }
        }
    },

    async getForm(id: string) {
        try {
            const response = await fetch(`/api/form/${id}`, {
            })

            const data = await response.json()
            return { form: data.form }
        } catch {
            return { err: "server-not-responding" }
        }
    }
}