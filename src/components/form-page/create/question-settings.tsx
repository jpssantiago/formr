"use client"

import { useCreateForm } from "@/contexts/create-form-context"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function QuestionSettings() {
    const { selectedQuestion, updateQuestion } = useCreateForm()

    return (
        <div className="flex flex-col gap-4 bg-[#F7F7F6] p-3 rounded-lg w-80 h-full">
            <Select>
                <SelectTrigger>
                    <SelectValue placeholder="Short text" />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="shortText">Short text</SelectItem>
                    <SelectItem value="longText">Long text</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phoneNumber">Phone number</SelectItem>
                    <SelectItem value="url">URL</SelectItem>
                    <SelectItem value="yesNo">Yes / no</SelectItem>
                </SelectContent>
            </Select>

            <Separator />

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label htmlFor="required" className="font-normal text-sm">
                        Required
                    </Label>

                    <Switch
                        id="required"
                    />
                </div>

                <div className="flex justify-between items-center">
                    <Label htmlFor="required" className="font-normal text-sm">
                        Min number
                    </Label>

                    <Switch
                        id="minNumber"
                    />
                </div>

                <div className="flex justify-between items-center">
                    <Label htmlFor="required" className="font-normal text-sm">
                        Max number
                    </Label>

                    <Switch
                        id="maxNumber"
                    />
                </div>

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
        </div>
    )
}