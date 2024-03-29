import prisma from "lib/prisma"
import NextAuth from "next-auth"
import { updateUserToAdmin } from "lib/data.js"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

let data

if (process.env.NODE_ENV === "development") {
    data = {
        server: process.env.EMAIL_SERVER,
        from: process.env.EMAIL_FROM,
    }
} else {
    data = {
        server: {
            host: process.env.EMAIL_SERVER_HOST,
            port: process.env.EMAIL_SERVER_PORT,
            auth: {
                user: process.env.EMAIL_SERVER_USER,
                pass: process.env.EMAIL_SERVER_PASSWORD,
            },
        },
        from: process.env.EMAIL_FROM,
    }
}

export default NextAuth({
    providers: [EmailProvider(data)],

    database: process.env.DATABASE_URL,
    secret: process.env.SECRET,

    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    debug: true,
    adapter: PrismaAdapter(prisma),

    callbacks: {
        session: async ({ session, user }) => {
            session.user.id = user.id
            session.user.isAdmin = user.isAdmin
            return Promise.resolve(session)
        },
    },

    events: {
        signIn: async ({ user, isNewUser }) => {
            if (isNewUser) {
                const userEmail = user.email
                const isAdminEmail =
                    userEmail.split("@")[1] === process.env.ADMIN_EMAIL_DOMAIN

                isAdminEmail
                    ? await updateUserToAdmin(user.id, prisma, isAdminEmail)
                    : console.log(`non-Admin domain`)
            }
        },
    },
})
