import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignInButton from "./SignInButton";

export default function Hero() {
    return (
        <section className="h-screen flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl font-bold sm:text-6xl">
                Create Stunning Resumes <br /> in Minutes
            </h1>
            <p className="mt-4 text-lg text-gray-600">
                Sign in and generate your professional resume effortlessly.
            </p>
            {/* <Button className="mt-6 text-lg px-6 py-3" asChild>
                <Link href="/api/auth/signin">Sign in with Google</Link>
            </Button> */}
            <SignInButton className="mt-6 text-lg px-6 py-3" />
        </section>
    );
}
