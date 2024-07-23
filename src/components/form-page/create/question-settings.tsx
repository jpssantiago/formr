"use client"

import { useCreateForm } from "@/contexts/create-form-context"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TYPE_LIST } from "@/_data/types"
import { cn } from "@/lib/utils"
import { MinMaxValueOption } from "./min-max-value-option"

export function QuestionSettings() {
    const { selectedQuestion, updateQuestion } = useCreateForm()

    return (
        <div className="flex flex-col gap-4 bg-zinc-100 p-3 rounded-lg w-60 h-full">
            <Select
                value={selectedQuestion.type.slug}
                onValueChange={slug => {
                    updateQuestion({
                        ...selectedQuestion,
                        type: TYPE_LIST.find(type => type.slug == slug)!
                    })
                }}
            >
                <SelectTrigger>
                    <SelectValue>
                        <div className="flex items-center gap-3 text-sm">
                            <div className={cn("p-1.5 rounded-lg", selectedQuestion.type.category.color)}>
                                {<selectedQuestion.type.icon size={16} />}
                            </div>

                            {selectedQuestion.type.name}
                        </div>
                    </SelectValue>
                </SelectTrigger>

                <SelectContent>
                    {TYPE_LIST.map(type => (
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
                    />
                </div>



                {selectedQuestion.type.slug == "number" && (
                    <MinMaxValueOption />
                )}

                {selectedQuestion.type.category.slug == "text" && (
                    <p>min/max chars</p>
                )}

                <Separator />

                <div className="space-y-0.5">
                    <label className="text-sm">
                        Button text
                    </label>

                    <Input
                        placeholder="Continue"
                        value={selectedQuestion.buttonText}
                        onChange={e => {
                            updateQuestion({
                                ...selectedQuestion,
                                buttonText: e.target.value
                            })
                        }}
                    />
                </div>
            </div>
        </div >
    )
}