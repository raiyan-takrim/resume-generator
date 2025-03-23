import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { db } from "@/lib/db"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/sign-in"
  }
})