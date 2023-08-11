import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Home() {
    const supabase = createServerComponentClient<Database>({
        cookies,
    });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect("/unauth");
    }

    const { data: teams } = await supabase.from("Teams").select("*");

    return (
        <div>
            <nav>
                <Link href={"/team"}>Teams</Link>
            </nav>
            <main>
                <h1>Hello, {session?.user.email?.split("@")[0] ?? "User"}</h1>
            </main>
        </div>
    );
}
