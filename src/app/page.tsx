import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import RealtimeTeams from "./realtime-teams";

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
        <main>
            <h1>Hello, {session?.user.email}</h1>
            <RealtimeTeams teams={teams ?? []} />
        </main>
    );
}
