import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { TopBarLink } from "./top-bar-link"
import { PublishFormButton } from "./publish-form-button"

export function TopBar({ formId }: { formId: string }) {
    return (
        <div className="flex justify-between items-center h-12">
            <div className="flex-1">
                <Link href="/dashboard" className="flex items-center gap-2 w-fit text-zinc-600 hover:text-black transition-all hover:-translate-x-1">
                    <ArrowLeft
                        size={20}
                    />

                    <p className="text-sm">
                        Go back
                    </p>
                </Link>
            </div>

            <div className="flex flex-1 justify-center gap-2 h-full">
                <TopBarLink href={`/form/${formId}/create`}>
                    Create
                </TopBarLink>

                <TopBarLink href={`/form/${formId}/share`}>
                    Share
                </TopBarLink>

                <TopBarLink href={`/form/${formId}/results`}>
                    Results
                </TopBarLink>
            </div>

            <div className="flex flex-1 justify-end">
                <PublishFormButton
                    formId={formId}
                />
            </div>
        </div>
    )
}