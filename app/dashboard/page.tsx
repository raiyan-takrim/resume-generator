import { Button } from "@/components/ui/button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import SignOutButton from "@/components/SignOutButton";
import ResumeForm from "@/components/ResumeForm";

export default async function Dashboard() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl text-red-500">Unauthorized</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
                <div className="flex items-center gap-6">
                    <img
                        src={session.user?.image || ""}
                        alt="User Profile"
                        className="w-20 h-20 rounded-full border-2 border-gray-300"
                    />
                    <div>
                        <p className="text-xl font-semibold">{session.user?.name}</p>
                        <p className="text-gray-600">{session.user?.email}</p>
                    </div>
                    <SignOutButton />
                </div>
            </div>
            <ResumeForm />
        </div>
    );
}
