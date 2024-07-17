import { Resend } from "resend"

import { env } from "@/env/env"
import { JSXElementConstructor, ReactElement } from "react"

const resend = new Resend(env.RESEND_API_KEY)

type SendEmailProps = {
    from?: string
    to: string
    subject: string
    content: ReactElement<any, string | JSXElementConstructor<any>>;
}

export async function sendEmail({ from, to, subject, content }: SendEmailProps): Promise<boolean> {
    const { error } = await resend.emails.send({
        from: from ?? "João from Formr <noreply@formr.app>",
        to: [to],
        subject: subject,
        react: content,
    })

    return !!error
}