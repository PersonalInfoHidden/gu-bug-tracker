"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Database } from "@/lib/database.types";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const supabase = createClientComponentClient<Database>();

    const handleSignUp = async () => {
        await supabase.auth.signUp({
            email: "dodojop428@niback.com",
            password: "dodojop428",
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        });
        router.refresh();
    };

    const handleSignIn = async () => {
        await supabase.auth.signInWithPassword({
            email: "dodojop428@niback.com",
            password: "dodojop428",
        });
        router.refresh();
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <>
            <button onClick={handleSignUp} className="p-6">
                Sign up
            </button>
            <button onClick={handleSignIn} className="p-6">
                Sign in
            </button>
            <button onClick={handleSignOut} className="p-6">
                Sign out
            </button>
        </>
    );
}
