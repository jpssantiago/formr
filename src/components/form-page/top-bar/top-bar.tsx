import { TopBarLinks } from "./top-bar-links"
import { PublishFormSection } from "./publish-form-section"
import { TopBarReturn } from "./top-bar-return"

export function TopBar({ formId }: { formId: string }) {
    return (
        <div className="flex justify-between items-center h-12">
            <TopBarReturn />

            <TopBarLinks
                formId={formId}
            />

            <PublishFormSection
                formId={formId}
            />
        </div>
    )
}