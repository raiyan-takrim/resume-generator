
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {FaEdit} from "react-icons/fa"

export default async function Dashboard() {
    const session = await auth()

    return (
        <div className="h-full w-full p-6">
            <div className="flex flex-col h-full border rounded-md">
                <div className="p-4 border-b">
                    <h1 className="text-xl font-bold mb-6">Dashboard</h1>
                    <h2>
                        Welcome back, <b>{session?.user?.name}!</b>
                    </h2>
                </div>
                <div className="flex-1 grid place-items-center">
                    <div className="my-auto">
                        <h3 className="text-sm">No resume found!</h3>
                        <Button className="mt-4" asChild>
                            <Link href="/dashboard/create" className="flex items-center gap-2">
                                <FaEdit className="text-lg" /> Create Resume
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
