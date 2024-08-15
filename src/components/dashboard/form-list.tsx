import { Form } from "@prisma/client"

import { NoFormsIndicator } from "./no-forms-indicator"
import { NoFormsOnFolderIndicator } from "./no-folders-indicator"
import { FormListItem } from "./form-list-item"

type FormListProps = {
    forms: Form[]
}

export function FormList({ forms }: FormListProps) {
    return (
        <div className="flex flex-col gap-4">
            {forms.length == 0 && (
                <NoFormsIndicator />
            )}

            {forms.length > 0 && forms.length == 0 ? (
                <NoFormsOnFolderIndicator />
            ) : (
                forms.map((form) => (
                    <FormListItem
                        key={form.id}
                        form={form}
                        forms={forms}
                    />
                ))
            )}
        </div>
    )
}