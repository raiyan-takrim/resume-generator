import SignInButton from "./auth/SignInButton";

export default function Hero() {
    return (
        <section className="h-full flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl font-bold sm:text-6xl">
                Create Stunning Resumes <br /> in Minutes
            </h1>
            <p className="mt-4 text-lg">
                Sign in and generate your professional resume effortlessly.
            </p>
            {/* <Button className="mt-6 text-lg px-6 py-3" asChild>
                <Link href="/api/auth/signin">Sign in with Google</Link>
            </Button> */}

            <SignInButton size={"lg"} className="mt-6 text-lg" />
        </section>
    );
}
