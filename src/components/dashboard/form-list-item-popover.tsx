"use client"

import { ReactNode, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Copy, ExternalLink, FolderInput, Link, PenLine, Trash } from "lucide-react"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { PopoverItem, PopoverItemIcon, PopoverItemText } from "@/components/ui/popover-item"
import { Separator } from "@/components/ui/separator"
import { RenameFormDialog } from "./rename-form-dialog"
import { MoveFormToFolderSheet } from "./move-form-to-folder-sheet"
import { DeleteFormDialog } from "./delete-form-dialog"
import { Form } from "@prisma/client"
import { FormService } from "@/services/form-service"

type FormListItemPopoverProps = {
    form: Form
    children: ReactNode
}

export function FormListItemPopover({ form, children }: FormListItemPopoverProps) {
    const [open, setOpen] = useState<boolean>(false)

    const { push, refresh } = useRouter()

    function openForm() {
        push(`/form/${form.id}`)
    }

    function copyLinkToClipboard() {
        navigator.clipboard.writeText(`${window.origin}/f/${form.id}`)
        toast.success("The form's link was copied to your clipboard.")
    }

    async function duplicateForm() {
        const promise = FormService.duplicateForm(form.id)

        toast.promise(promise, {
            loading: "Duplicating...",
            success: () => {
                refresh()
                return `The form "${form.name}" was duplicated.`
            },
            error: "There was an unknown error. Please try again later."
        })
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>

            <PopoverContent className="space-y-1 p-1 w-44" align="end" onClick={e => e.stopPropagation()}>
                <PopoverItem onClick={openForm}>
                    <PopoverItemIcon icon={ExternalLink} />
                    <PopoverItemText>Open</PopoverItemText>
                </PopoverItem>

                <PopoverItem onClick={copyLinkToClipboard}>
                    <PopoverItemIcon icon={Link} />
                    <PopoverItemText>Copy link</PopoverItemText>
                </PopoverItem>

                <Separator />

                <RenameFormDialog form={form} onClose={() => setOpen(false)}>
                    <PopoverItem autoClose={false}>
                        <PopoverItemIcon icon={PenLine} />
                        <PopoverItemText>Rename</PopoverItemText>
                    </PopoverItem>
                </RenameFormDialog>

                <MoveFormToFolderSheet form={form} onCloseSheet={() => setOpen(false)}>
                    <PopoverItem autoClose={false}>
                        <PopoverItemIcon icon={FolderInput} />
                        <PopoverItemText>Move to folder</PopoverItemText>
                    </PopoverItem>
                </MoveFormToFolderSheet>

                <PopoverItem onClick={duplicateForm}>
                    <PopoverItemIcon icon={Copy} />
                    <PopoverItemText>Make a copy</PopoverItemText>
                </PopoverItem>

                <DeleteFormDialog form={form} onClose={() => setOpen(false)}>
                    <PopoverItem variant="destructive" autoClose={false}>
                        <PopoverItemIcon icon={Trash} />
                        <PopoverItemText>Delete</PopoverItemText>
                    </PopoverItem>
                </DeleteFormDialog>
            </PopoverContent>
        </Popover>
    )
}