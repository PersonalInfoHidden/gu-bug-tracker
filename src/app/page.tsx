import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Home() {
    const supabase = createServerComponentClient<Database>({
        cookies,
    });
    const {
        data: { session },
    } = await supabase.auth.getSession();
    return (
        <main>
            <h1>Hello, {session?.user.email}</h1>
        </main>
    );
}
