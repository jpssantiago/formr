import { Play, Plus, Smartphone } from "lucide-react"

import { TextIconButton } from "@/components/ui/text-icon-button"
import { AddQuestionDialog } from "./add-question-dialog"
import { Separator } from "@/components/ui/separator"
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper"
import { IconButton } from "@/components/ui/icon-button"

export function FormActions() {
    return (
        <div className="flex items-center gap-2 bg-zinc-100 px-3 py-2 rounded-lg w-full">
            <AddQuestionDialog>
                <TextIconButton icon={Plus} variant="outline" className="h-9">
                    Add question
                </TextIconButton>
            </AddQuestionDialog>

            <Separator orientation="vertical" className="ml-3 h-6" />

            <TooltipWrapper tooltip="Preview">
                <IconButton icon={Play} />
            </TooltipWrapper>

            <TooltipWrapper tooltip="Mobile view">
                <IconButton icon={Smartphone} />
            </TooltipWrapper>
        </div>
    )
}