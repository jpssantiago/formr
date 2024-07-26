import { ReactNode } from "react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

type CreateQuestionDialogProps = {
    children: ReactNode
}

export function CreateQuestionDialog({ children }: CreateQuestionDialogProps) {
    return (
        <Dialog>
            <DialogTrigger>
                {children}
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