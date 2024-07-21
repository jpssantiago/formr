"use client"

import { useState } from "react"
import Link from "next/link"
import { FileType, FolderOpen } from "lucide-react"

import { Folder, Form } from "@prisma/client"
import { Separator } from "@/components/ui/separator"
import { FolderCarouselItem } from "@/components/dashboard/folder-carousel-item"
import { FormListItem } from "@/components/dashboard/form-list-item"
import { Button } from "@/components/ui/button"
import { ManageFoldersDialog } from "@/components/dashboard/manage-folders-dialog"

type DashboardClientPageProps = {
    forms: Form[]
    folders: Folder[]
}

export function DashboardClientPage({ forms, folders }: DashboardClientPageProps) {
    const [selectedFolder, setSelectedFolder] = useState<Folder | null>()

    function getForms(): Form[] {
        if (!selectedFolder) {
            return forms
        }

        return forms.filter(form => form.folderId == selectedFolder.id)
    }

    function onSelectFolder(folder: Folder) {
        setSelectedFolder(selectedFolder?.id == folder.id ? null : folder)
    }

    return (
        <div className="flex flex-col gap-5">
            <Header folders={folders} />

            <Separator className="mt-5" />

            {folders.length > 0 && (
                <div className="space-y-2">
                    <p className="text-[15px] text-zinc-800">
                        Folders ({folders.length})
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {folders.map((folder) => (
                            <FolderCarouselItem
                                key={folder.id}
                                folder={folder}
                                onSelect={() => onSelectFolder(folder)}
                                isSelected={selectedFolder?.id == folder.id}
                            />
                        ))}
                    </div>
                </div>
            )}

            <div className="flex flex-col gap-4">
                {forms.length == 0 && (
                    <NoFormsIndicator />
                )}

                {forms.length > 0 && getForms().length == 0 ? (
                    <NoFormsOnFolderIndicator />
                ) : (
                    getForms().map((form) => (
                        <FormListItem
                            key={form.id}
                            form={form}
                            forms={forms}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

function Header({ folders }: { folders: Folder[] }) {
    return (
        <div className="flex small:flex-col justify-between items-center gap-10 w-full">
            <div className="space-y-1 small:text-center">
                <h1 className="font-semibold text-2xl">
                    All forms
                </h1>

                <p className="text-[15px] text-zinc-600">
                    Manage all your forms / surveys in one place.
                </p>
            </div>

            <div className="flex medium:flex-col-reverse gap-2">
                <Link href="/form">
                    <Button className="medium:w-full">
                        Create a new form
                    </Button>
                </Link>

                <ManageFoldersDialog folders={folders}>
                    <Button variant="outline">
                        Manage folders
                    </Button>
                </ManageFoldersDialog>
            </div>
        </div>
    )
}

function NoFormsIndicator() {
    return (
        <div className="flex flex-col items-center gap-3 w-full text-center">
            <FileType
                size={36}
            />

            <div className="space-y-1">
                <p className="font-medium text-sm">
                    It looks like you haven&apos;t created any form
                </p>

                <span className="text-sm text-zinc-500">
                    Get started by creating your first form
                </span>
            </div>
        </div>
    )
}

function NoFormsOnFolderIndicator() {
    return (
        <div className="flex flex-col items-center gap-3 w-full text-center">
            <FolderOpen
                size={36}
            />

            <div className="space-y-1">
                <p className="font-medium text-sm">
                    This folder is empty
                </p>

                <span className="text-sm text-zinc-500">
                    Move forms into this folder to see them here
                </span>
            </div>
        </div>
    )
}