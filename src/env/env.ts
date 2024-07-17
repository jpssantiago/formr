import { z } from "zod"

const envSchema = z.object({
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GITHUB_CLIENT_ID: z.string(),
    GITHUB_CLIENT_SECRET: z.string(),

    RESEND_API_KEY: z.string(),

    NEXTAUTH_SECRET: z.string()
})

export const env = envSchema.parse(process.env)