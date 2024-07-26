"use client"

import { useState, useEffect } from "react"
import { Link, Mail, Pen, QrCode, Linkedin } from "lucide-react"
import { toast } from "sonner"

import { useCreateForm } from "@/contexts/create-form-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { IconButton } from "@/components/ui/icon-button"
import { CustomizeFormLinkDialog } from "@/components/form-page/share/customize-form-link-dialog"
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper"
import { FormItem } from "@/components/form-item"

export default function ShareFormPage() {
    const [url, setUrl] = useState<string>("")

    const { form, questions } = useCreateForm()

    function copyToClipboard() {
        navigator.clipboard.writeText(url)
        toast.success("The link was copied to your clipboard.")
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            setUrl(`${window.origin}/f/${form?.id}`)
        }
    }, [form])

    return (
        <div className="flex flex-col gap-5 mb-5 h-full">
            <div className="flex medium:flex-col items-center gap-2 bg-zinc-100 px-3 py-2 rounded-lg w-full">
                <div className="flex flex-1 medium:flex-auto items-center gap-2 medium:w-full">
                    <Input
                        value={url}
                        className="h-9"
                        readOnly
                    />

                    <IconButton icon={Link} iconSize={18} className="h-9" onClick={copyToClipboard}>
                        Copy
                    </IconButton>
                </div>

                <Separator orientation="vertical" className="medium:hidden h-6" />

                <div className="flex medium:justify-between items-center gap-2 medium:w-full">
                    <CustomizeFormLinkDialog>
                        <IconButton
                            icon={Pen}
                            iconSize={18}
                            className="hover:bg-zinc-200 medium:w-fit h-9 text-zinc-600 hover:text-black"
                            variant="ghost"
                        >
                            Customize
                        </IconButton>
                    </CustomizeFormLinkDialog>

                    <Separator orientation="vertical" className="medium:hidden h-6" />

                    <div className="flex items-center gap-2">
                        <TooltipWrapper tooltip="Email link">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="hover:bg-zinc-200 h-9 text-zinc-600 hover:text-black"
                            >
                                <Mail
                                    size={18}
                                />
                            </Button>
                        </TooltipWrapper>

                        <TooltipWrapper tooltip="QR Code link">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="hover:bg-zinc-200 h-9 text-zinc-600 hover:text-black"
                            >
                                <QrCode
                                    size={18}
                                />
                            </Button>
                        </TooltipWrapper>

                        <TooltipWrapper tooltip="LinkedIn">
                            <Button
                                size="icon"
                                variant="ghost"
                                className="hover:bg-zinc-200 h-9 text-zinc-600 hover:text-black"
                            >
                                <Linkedin
                                    size={18}
                                />
                            </Button>
                        </TooltipWrapper>
                    </div>
                </div>
            </div>

            {form && (
                <div className="border rounded-lg h-full">
                    <FormItem
                        questions={questions}
                    />
                </div>
            )}
        </div>
    )
}