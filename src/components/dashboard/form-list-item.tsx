"use client"

import { AreaChart, ArrowUp10, EllipsisVertical, Home } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { FormListItemPopover } from "./form-list-item-popover"
import { FormAnalyticsButton } from "./form-analytics-button"

export function FormListItem() {
    const { push } = useRouter()

    function onClick() {
        push(`/form/id`)
    }

    return (
        <div onClick={onClick} className="flex justify-between items-center small:items-start hover:bg-zinc-100 px-5 py-3 border rounded-lg transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
                <span className="small:hidden text-2xl">
                    🚀
                </span>

                <div className="small:flex small:flex-col small:gap-2 space-y-1">
                    <h1 className="small:hidden font-medium truncate">
                        My new form
                    </h1>

                    <h1 className="small:block hidden font-medium truncate">
                        🚀 My new form
                    </h1>

                    <p className="flex small:flex-col items-center small:items-start gap-1 text-xs text-zinc-600">
                        <span>
                            4h ago
                        </span>

                        <span className="small:hidden">
                            •
                        </span>

                        <span>
                            Public
                        </span>

                        <span className="small:hidden">
                            •
                        </span>

                        <span>
                            8 questions
                        </span>
                    </p>
                </div>
            </div>

            <div className="flex small:flex-col items-center gap-2">
                <FormAnalyticsButton icon={AreaChart}>
                    0 views
                </FormAnalyticsButton>

                <FormAnalyticsButton icon={ArrowUp10}>
                    0 replies
                </FormAnalyticsButton>

                <FormListItemPopover>
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