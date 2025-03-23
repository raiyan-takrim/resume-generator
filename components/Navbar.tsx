"use client";
import Link from "next/link";
import SignInButton from "./auth/SignInButton";
import { useSession } from "next-auth/react";
import UserIcon from "./user-icon";

export default function Navbar() {
    const { data: session } = useSession();
    return (
        <nav className="w-full shadow shadow-accent px-6 py-4 flex items-center">
            <div className="">
                <h1 className="text-xl font-bold"><Link href="/">Resume Builder</Link></h1>
            </div>
            <div className="ml-auto">
                {
                    session?.user ?
                        <UserIcon />
                        :
                        <SignInButton className=" invisible md:visible" />

                }

            </div>
        </nav>
    );
}
