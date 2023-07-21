import React from "react";
import RealtimeBugs from "./realtime-bugs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const supabase = createServerComponentClient<Database>({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
        redirect("/unauth");
    }

    const { data: bugs } = await supabase
        .from("Bugs")
        .select("*")
        .eq("team_id", Number(params.id));
    return (
        <div>
            <h2>Hello {session.user.email}</h2>
            <h1>Page: {params.id}</h1>
            <RealtimeBugs bugs={bugs ?? []} />
        </div>
    );
}
