"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { Github } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import { AuthProviderButton } from "@/components/auth-provider-button"
import { GoogleIcon } from "@/components/icons/google"

const signInSchema = z.object({
    email: z.string().email({
        message: "This email address doesn't look valid."
    })
})

type SignInSchemaType = z.infer<typeof signInSchema>

export default function SignInPage() {
    const { handleSubmit, register, formState, setError } = useForm<SignInSchemaType>({
        resolver: zodResolver(signInSchema)
    })

    const isLoading = formState.isSubmitting
    const hasErrors = formState.errors.root?.message || formState.errors.email?.message

    async function onSubmit({ email }: SignInSchemaType) {
        if (isLoading) return

        const response = await signIn("email", { email, redirect: false })
        if (response?.error) {
            return setError("root", { message: "There was an unknown error. Please try again later." })
        }

        toast.success("Email sent - Check your inbox (or spam).")
    }

    async function authenticateWith(provider: "google" | "github") {
        signIn(provider, { callbackUrl: "/dashboard" }).catch(_ => {
            return setError("root", { message: "There was an unknown error. Please try again later." })
        })
    }

    return (
        <div className="space-y-10 w-full max-w-[350px] text-center">
            <div className="space-y-1">
                <h1 className="font-bold text-2xl">
                    Welcome to Formr
                </h1>

                <p className="text-sm">
                    Forms and Surveys. Free and Open Source.
                </p>
            </div>

            <div className="space-y-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {hasErrors && (
                        <Alert variant="destructive" className="py-3 text-start">
                            <AlertDescription>
                                {formState.errors.root?.message}
                            </AlertDescription>

                            <AlertDescription>
                                {formState.errors.email?.message}
                            </AlertDescription>
                        </Alert>
                    )}

                    <Input
                        placeholder="email@provider.com"
                        {...register("email")}
                        className={formState.errors.email?.message && "border-destructive"}
                    />

                    <LoadingButton loading={isLoading} className="w-full">
                        Continue with Email
                    </LoadingButton>
                </form>

                <div className="flex items-center gap-2 text-zinc-600">
                    <div className="bg-zinc-600 w-full h-px" />
                    <p>or</p>
                    <div className="bg-zinc-600 w-full h-px" />
                </div>

                <div className="flex flex-col gap-2">
                    <AuthProviderButton icon={GoogleIcon} onClick={() => authenticateWith("google")}>
                        Continue with Google
                    </AuthProviderButton>

                    <AuthProviderButton icon={Github} onClick={() => authenticateWith("github")}>
                        Continue with Github
                    </AuthProviderButton>
                </div>
            </div>
        </div>
    )
}