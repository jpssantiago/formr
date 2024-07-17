import AuthenticationEmail from "@/email-templates/authentication-email"
import { sendEmail } from "@/lib/resend"

export async function sendVerificationRequestEmail(email: string, url: string): Promise<boolean> {
    return sendEmail({
        to: email,
        subject: "Hey, welcome to Formr.",
        content: AuthenticationEmail(url)
    })
}