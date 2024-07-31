import { ReactNode } from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"

type CustomizeFormLinkDialogProps = {
    children: ReactNode
}

export function CustomizeFormLinkDialog({ children }: CustomizeFormLinkDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span>
                    {children}
                </span>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Title</DialogTitle>
                    <DialogDescription>Description</DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}