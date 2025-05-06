import prisma from "../../../../lib/prisma"
import NextAuth, { NextAuthOptions } from "next-auth"
import { updateUserToAdmin } from "../../../../lib/data"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

type data = {
    server?:
        | string
        | {
              host?: string
              port?: string
              auth?: {
                  user?: string
                  pass?: string
              }
          }
    from?: string
}

let data: data

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

export const authOptions: NextAuthOptions = {
    providers: [EmailProvider(data)],
    // database: process.env.DATABASE_URL, // REMOVE: not supported in App Router
    secret: process.env.SECRET,
    session: {
        strategy: "jwt",
    },
    debug: true,
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async session({ session, user, token }) {
            if (session.user && token) {
                session.user.id = token.id
                session.user.isAdmin = token.isAdmin
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.isAdmin = user.isAdmin
            }
            return token
        },
    },
    events: {
        async signIn({ user, isNewUser }) {
            if (isNewUser) {
                const userEmail = (user as any).email
                const isAdminEmail =
                    userEmail &&
                    userEmail.split("@")[1] === process.env.ADMIN_EMAIL_DOMAIN
                if (isAdminEmail) {
                    await updateUserToAdmin(
                        (user as any).id,
                        prisma,
                        isAdminEmail
                    )
                } else {
                    console.log(`non-Admin domain`)
                }
            }
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
