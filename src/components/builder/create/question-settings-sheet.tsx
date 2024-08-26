import { ReactNode } from "react"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import { QuestionSettings } from "./question-settings"

type QuestionSettingsSheetProps = {
    onClick: () => void
    children: ReactNode
}

export function QuestionSettingsSheet({ onClick, children }: QuestionSettingsSheetProps) {
    return (
        <Sheet>
            <SheetTrigger onClick={onClick}>
                {children}
            </SheetTrigger>

            <SheetContent className="flex flex-col gap-4 max-w-[400px]">
                <SheetHeader className="items-start text-start">
                    <SheetTitle>Settings</SheetTitle>
                    <SheetDescription>Customize the question.</SheetDescription>
                </SheetHeader>

                <QuestionSettings />
            </SheetContent>
        </Sheet>
    )
}