"use client"
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export default function SignInButton({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const { data: session } = useSession();
  const router = useRouter()

  const handleClick = () => {
    if (session && session.user) {
      router.push("/dashboard")
    }
    signIn("google", { callbackUrl: "/dashboard" })
  }
  return (
    <Button
      variant={variant}
      size={size}
      className={cn("px-10 py-4", className)}
      onClick={handleClick}
      {...props} asChild={asChild}
      >
      <FcGoogle /> Sign in with Google
    </Button>
  );
}