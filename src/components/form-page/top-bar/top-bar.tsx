import { TopBarLinks } from "./top-bar-links"
import { PublishFormSection } from "./publish-form-section"
import { TopBarReturn } from "./top-bar-return"

export function TopBar({ formId }: { formId: string }) {
    return (
        <>
            <div className="flex justify-between items-center medium:hidden h-12">
                <TopBarReturn />

                <TopBarLinks
                    formId={formId}
                />

                <PublishFormSection
                    formId={formId}
                />
            </div>

            <div className="medium:flex flex-col gap-3 hidden">
                <div className="flex justify-between items-center h-12">
                    <TopBarReturn />

                    <PublishFormSection
                        formId={formId}
                    />
                </div> 

                <TopBarLinks
                    formId={formId}
                />
            </div>
        </>
    )
}