import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db"; // Your Drizzle database instance

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    adapter: DrizzleAdapter(db),
    session: {
        strategy: "jwt" as SessionStrategy, // Explicitly casting the type
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
