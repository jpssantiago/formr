"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Link } from "lucide-react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type FormPublishedDialog = {
    open: boolean
    setOpen: (open: boolean) => void
    formId: string
}

export function FormPublishedDialog({ open, setOpen, formId }: FormPublishedDialog) {
    const [url, setUrl] = useState<string>("")

    useEffect(() => {
        if (typeof window !== "undefined") {
            setUrl(`${window.origin}/f/${formId}`)
        }
    }, [])
    
    function onCopy() {
        navigator.clipboard.writeText(url)
        toast.success("The link was copied to your clipboard.")
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Your form has been published! 🎉
                    </DialogTitle>

                    <DialogDescription>
                        The changes are now public and the form can be accessed
                        using the link below.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex gap-2">
                    <Input
                        placeholder="URL"
                        value={url}
                        readOnly
                    />

                    <Button className="flex gap-2" onClick={onCopy}>
                        <Link size={20} />

                        Copy link
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}