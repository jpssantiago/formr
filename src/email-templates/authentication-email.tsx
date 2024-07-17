import React from "react"

import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components"

export default function AuthenticationEmail(link: string) {
    return (
        <Html>
            <Head />
            <Preview>Verify your email to create awesome forms and surveys.</Preview>
            <Tailwind>
                <Body className="bg-white mx-auto my-auto font-sans">
                    <Container className="mx-auto my-10 p-5 w-[465px]">
                        <Text className="mx-0 mt-4 mb-8 p-0 font-normal text-4xl">
                            <span className="font-bold tracking-tighter">Formr</span>
                        </Text>
                        <Text className="mx-0 my-7 p-0 font-semibold text-2xl text-black">
                            You need to verify your email to access the platform
                        </Text>
                        <Text className="text-black leading-6">
                            Click on the verification link below to validate your account.
                        </Text>
                        <Section className="my-8">
                            <Button
                                className="bg-blue-500 rounded font-semibold text-center text-white no-underline"
                                href={link}
                                style={{ padding: "12px 20px" }}
                            >
                                Authenticate (verify email)
                            </Button>
                        </Section>
                        <Text className="text-black leading-6">
                            or copy and paste this URL into your browser:
                        </Text>
                        <Text className="flex-wrap max-w-sm font-medium text-purple-600 no-underline break-words">
                            {link}
                        </Text>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}