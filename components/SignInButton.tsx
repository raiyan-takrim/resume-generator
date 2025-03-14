"use client";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SignInButton({ className }: { className?: string }) {
    return (
        <Button
            className={className}
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>Sign in with Google</Button>
    );
}

// "use client";

// import { signIn } from "next-auth/react";

// export default function SignInButton() {
//     return (
//         <button
//             onClick={() => signIn("google")}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//             Sign in with Google
//         </button>
//     );
// }
