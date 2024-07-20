"use client"

import { AreaChart, ArrowUp10, EllipsisVertical } from "lucide-react"
import { useRouter } from "next/navigation"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

import { Form } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { FormListItemPopover } from "./form-list-item-popover"
import { FormAnalyticsButton } from "./form-analytics-button"

dayjs.extend(relativeTime)

type FormListItemProps = {
    form: Form
    forms: Form[]
}

export function FormListItem({ form, forms }: FormListItemProps) {
    const { push } = useRouter()

    function onClick() {
        push(`/form/id`)
    }

    let formName = form.name
    const formsWithSameName: Form[] = []

    forms.forEach(f => {
        if (f.name == form.name) {
            formsWithSameName.push(f)
        }
    })

    formsWithSameName.forEach((f, index) => {
        if (f.id == form.id) {
            formName = index == 0 ? form.name : `${formName} (${index})`
        }
    })

    return (
        <div onClick={onClick} className="flex justify-between items-center small:items-start hover:bg-zinc-100 px-5 py-3 border rounded-lg transition-colors cursor-pointer group">
            <div className="small:flex small:flex-col small:gap-2 space-y-1">
                <h1 className="font-medium truncate">
                    {formName}
                </h1>

                <p className="flex small:flex-col items-center small:items-start gap-1 text-xs text-zinc-600">
                    <span>
                        {dayjs().to(form.updatedAt)}
                    </span>

                    <span className="small:hidden">
                        •
                    </span>

                    <span>
                        {form.isPublished ? "Public" : "Private"}
                    </span>

                    <span className="small:hidden">
                        •
                    </span>

                    <span>
                        {"{x}"} questions
                    </span>
                </p>
            </div>

            <div className="flex small:flex-col items-center gap-2">
                <FormAnalyticsButton icon={AreaChart}>
                    0 views
                </FormAnalyticsButton>

                <FormAnalyticsButton icon={ArrowUp10}>
                    0 replies
                </FormAnalyticsButton>

                <FormListItemPopover form={form}>
                    <Button size="icon" variant="ghost" className="hover:bg-zinc-200 border" onClick={e => e.stopPropagation()}>
                        <EllipsisVertical
                            size={20}
                            className="text-zinc-600"
                        />
                    </Button>
                </FormListItemPopover>
            </div>
        </div>
    )
}