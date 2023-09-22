import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import RealtimeTeams from "./realtime-teams";
import { MainNav } from "../main-nav";
import AuthNav from "@/app/auth-nav";

export default async function Team() {
    const supabase = createServerComponentClient<Database>({
        cookies,
    });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect("/unauth");
    }

    const { data: teams } = await supabase
        .from("Teams")
        .select("*")
        .order("id", { ascending: true })
        .limit(30);

    return (
        <div>
            <nav className="flex justify-between px-12">
                <MainNav className="" />
                <AuthNav session={!!session} />
            </nav>
            <main>
                <h1>Hello, {session?.user.email?.split("@")[0] ?? "User"}</h1>
                <RealtimeTeams teams={teams ?? []} />
            </main>
        </div>
    );
}
