import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import SignOutButton from "@/components/auth/SignOutButton"
import { AvatarImage } from "@radix-ui/react-avatar"
import { useSession } from "next-auth/react"

export default function UserIcon() {
    const { data: session } = useSession()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="w-8 h-8 cursor-pointer">
                    <AvatarImage src={session?.user?.image!} alt={session?.user?.name!} className="w-8 h-8" />
                    <AvatarFallback content="CN"/>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <SignOutButton className="w-full text-left" />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}