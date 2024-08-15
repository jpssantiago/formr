import { AuthForm } from "@/components/auth/auth-form"

export default function SignInPage() {
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

            <AuthForm />
        </div>
    )
}