import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import { env } from "@/env/env"
import { sendVerificationRequestEmail } from "@/lib/emails/verification-request-email"
import prisma from "@/lib/prisma"

const handler = NextAuth({
    pages: {
        error: "/auth",
        signIn: "/auth"
    },
    providers: [
        EmailProvider({
            async sendVerificationRequest({ identifier, url }) {
                if (process.env.NODE_ENV == "development") {
                    console.log(`[MAGIC-LINK] ${url}`)
                } else {
                    await sendVerificationRequestEmail(identifier, url)
                }
            },
        }),
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true
        }),
        GithubProvider({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
            allowDangerousEmailAccountLinking: true
        })
    ],
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    callbacks: {
        jwt: async ({ token, user }) => {
            if (!token.email) {
                return {}
            }
            if (user) {
                token.user = user
            }

            return token
        }
    },
    secret: env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }