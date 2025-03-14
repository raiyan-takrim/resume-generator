"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignInButton from "./SignInButton";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full bg-white shadow-md px-6 py-4 flex justify-between items-center z-50">
            <h1 className="text-xl font-bold">Resume Generator</h1>
            <SignInButton />
            {/* <Button asChild>
                <Link href="/api/auth/signin">Sign in with Google</Link>
            </Button> */}
        </nav>
    );
}
