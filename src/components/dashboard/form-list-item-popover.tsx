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

type FormListItemPopoverProps = {
    children: ReactNode
}

export function FormListItemPopover({ children }: FormListItemPopoverProps) {
    const [open, setOpen] = useState<boolean>(false)

    const { push } = useRouter()

    function openForm() {
        push(`/form/:id`)
    }

    function copyLinkToClipboard() {
        navigator.clipboard.writeText(`${window.origin}/f/id`)
        toast.success("The form's link was copied to your clipboard.")
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

                <RenameFormDialog onClose={() => setOpen(false)}>
                    <PopoverItem autoClose={false}>
                        <PopoverItemIcon icon={PenLine} />
                        <PopoverItemText>Rename</PopoverItemText>
                    </PopoverItem>
                </RenameFormDialog>

                <MoveFormToFolderSheet onCloseSheet={() => setOpen(false)}>
                    <PopoverItem autoClose={false}>
                        <PopoverItemIcon icon={FolderInput} />
                        <PopoverItemText>Move to folder</PopoverItemText>
                    </PopoverItem>
                </MoveFormToFolderSheet>

                <PopoverItem>
                    <PopoverItemIcon icon={Copy} />
                    <PopoverItemText>Make a copy</PopoverItemText>
                </PopoverItem>

                <DeleteFormDialog onClose={() => setOpen(false)}>
                    <PopoverItem variant="destructive" autoClose={false}>
                        <PopoverItemIcon icon={Trash} />
                        <PopoverItemText>Delete</PopoverItemText>
                    </PopoverItem>
                </DeleteFormDialog>
            </PopoverContent>
        </Popover>
    )
}