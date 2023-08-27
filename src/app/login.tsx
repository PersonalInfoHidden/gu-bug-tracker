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
        const { error } = await supabase.auth.signUp({
            email: "memew46549@xgh6.com",
            password: "memew46549",
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
                // data: {
                //     username: "blabla",
                // },
            },
        });
        alert(JSON.stringify(error));
        router.refresh();
    };

    const handleSignIn = async () => {
        const { error } = await supabase.auth.signInWithPassword({
            email: "dodojop428@niback.com",
            password: "dodojop428",
        });
        alert(JSON.stringify(error));
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
