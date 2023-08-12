import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { MainNav } from "./main-nav";

export default async function Home() {
    const supabase = createServerComponentClient<Database>({
        cookies,
    });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    return (
        <div>
            <nav>
                <MainNav className="" />
            </nav>
            <main>
                <h1>Hello, {session?.user.email?.split("@")[0] ?? "User"}</h1>
            </main>
        </div>
    );
}
