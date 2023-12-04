import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.AUTH_ID,
            clientSecret: process.env.AUTH_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
