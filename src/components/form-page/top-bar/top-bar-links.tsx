import { TopBarLink } from "./top-bar-link"

export function TopBarLinks({ formId }: { formId: string }) {
    return (
        <div className="flex flex-1 medium:flex-auto justify-center gap-2 medium:gap-0 medium:w-full h-full medium:h-12">
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