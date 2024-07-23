import { TopBarLink } from "./top-bar-link"

export function TopBarLinks({ formId }: { formId: string }) {
    return (
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
    )
}