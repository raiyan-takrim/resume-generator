'use client';

import { signOut } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

export default function SignOutButton({ className }: { className?: string }) {
    return (
        <Button className={cn(className)} onClick={() => signOut()}>Sign Out</Button>
    );
}