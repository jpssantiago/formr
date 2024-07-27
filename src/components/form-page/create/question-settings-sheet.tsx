import { ReactNode } from "react"

import { TQuestion } from "@/models/question"
import { useCreateForm } from "@/contexts/create-form-context"
import { QUESTION_TYPES } from "@/data/types"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { MinMaxValueOption } from "./min-max-value-option"
import { Input } from "@/components/ui/input"

type QuestionSettingsSheetProps = {
    question: TQuestion
    children: ReactNode
}

export function QuestionSettingsSheet({ question, children }: QuestionSettingsSheetProps) {
    const { updateQuestion } = useCreateForm()

    const types = QUESTION_TYPES.sort((b, a) => {
        if (a.category.slug < b.category.slug) {
            return -1
        }

        if (a.category.slug > b.category.slug) {
            return 1
        }

        return 0
    })

    return (
        <Sheet>
            <SheetTrigger>
                {children}
            </SheetTrigger>

            <SheetContent className="flex flex-col gap-4 max-w-[400px]">
                <SheetHeader className="items-start text-start">
                    <SheetTitle>Settings</SheetTitle>
                    <SheetDescription>Customize the question.</SheetDescription>
                </SheetHeader>

                <Select
                    value={question?.type.slug}
                    onValueChange={slug => {
                        updateQuestion({
                            ...question,
                            type: QUESTION_TYPES.find(type => type.slug == slug)!
                        })
                    }}
                >
                    <SelectTrigger>
                        <SelectValue>
                            <div className="flex items-center gap-3 text-sm">
                                <div className={cn("p-1.5 rounded-lg", question.type.category.color)}>
                                    <question.type.icon size={16} />
                                </div>

                                {question.type.name}
                            </div>
                        </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                        {types.map(type => (
                            <SelectItem key={type.slug} value={type.slug} className="p-2 [&_.select-check]:hidden">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className={cn("p-1.5 rounded-lg", type.category.color)}>
                                        {<type.icon size={16} />}
                                    </div>

                                    {type.name}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Separator />

                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <Label htmlFor="required" className="font-normal text-sm">
                            Required
                        </Label>

                        <Switch
                            id="required"
                            checked={question.isRequired}
                            onCheckedChange={checked => {
                                updateQuestion({
                                    ...question!,
                                    isRequired: checked
                                })
                            }}
                        />
                    </div>

                    {(question.type.slug == "number" || question.type.category.slug == "text") && (
                        <MinMaxValueOption />
                    )}

                    <Separator />

                    <div className="space-y-0.5">
                        <label className="text-sm">
                            Button text
                        </label>

                        <Input
                            placeholder="Continue"
                            value={question.buttonText ?? ""}
                            onChange={e => {
                                updateQuestion({
                                    ...question,
                                    buttonText: e.target.value
                                })
                            }}
                        />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}