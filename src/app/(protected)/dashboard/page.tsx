import Link from "next/link"
import { FileType, FolderPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FormListItem } from "@/components/dashboard/form-list-item"
import { CreateFolderDialog } from "@/components/dashboard/create-folder-dialog"
import { getForms } from "@/actions/get-forms"

export default async function DashboardPage() {
    const forms = await getForms()

    return (
        <div className="space-y-10">
            <Header />

            <Separator />

            <div className="flex flex-col gap-4">
                {forms?.length == 0 ? (
                    <NoFormsIndicator />
                ) : (
                    forms?.map((form) => (
                        <FormListItem 
                            key={form.id}
                            form={form}
                            forms={forms}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

function Header() {
    return (
        <div className="flex small:flex-col justify-between items-center gap-10 w-full">
            <div className="space-y-1 small:text-center">
                <h1 className="font-semibold text-2xl">
                    All forms
                </h1>

                <p className="text-[15px] text-zinc-600">
                    Manage all your forms / surveys in one place.
                </p>
            </div>

            <div className="flex medium:flex-col-reverse gap-2">
                <Link href="/form">
                    <Button className="medium:w-full">
                        Create a new form
                    </Button>
                </Link>

                <CreateFolderDialog>
                    <div>
                        <Button size="icon" variant="outline" className="border-zinc-300 medium:hidden hover:border-black text-zinc-500">
                            <FolderPlus />
                        </Button>

                        <Button variant="outline" className="medium:block hidden medi">
                            Create a new folder
                        </Button>
                    </div>
                </CreateFolderDialog>
            </div>
        </div>
    )
}

function NoFormsIndicator() {
    return (
        <div className="flex flex-col items-center gap-3 w-full text-center">
            <FileType
                size={36}
            />

            <div className="space-y-1">
                <p className="font-medium text-sm">
                    It looks like you haven&apos;t created any form
                </p>

                <span className="text-sm text-zinc-500">
                    Get started by creating your first form          
                </span>
            </div>
        </div>
    )
}