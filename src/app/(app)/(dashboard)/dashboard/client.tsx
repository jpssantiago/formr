"use client"

import { useState } from "react"
import { Folder, Form } from "@prisma/client"

import { FolderList } from "@/components/dashboard/folder-list"
import { FormList } from "@/components/dashboard/form-list"

type DashboardClientPageProps = {
    forms: Form[]
    folders: Folder[]
}

export function DashboardClientPage({ forms, folders }: DashboardClientPageProps) {
    const [selectedFolder, setSelectedFolder] = useState<Folder | undefined>()

    function getForms(): Form[] {
        if (!selectedFolder) {
            return forms
        }

        return forms.filter(form => form.folderId == selectedFolder.id)
    }

    function onSelectFolder(folder: Folder) {
        setSelectedFolder(selectedFolder?.id == folder.id ? undefined : folder)
    }

    return (
        <div className="space-y-5">
            {folders.length > 0 && (
                <FolderList
                    folders={folders}
                    onSelectFolder={onSelectFolder}
                    selectedFolder={selectedFolder}
                />
            )}

            <FormList
                forms={getForms()}
            />
        </div>
    )
}