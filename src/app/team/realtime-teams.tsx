"use client";

import React, { useEffect } from "react";
import Team from "./team";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Database } from "@/lib/database.types";

function RealtimeTeams({ teams }: { teams: Team[] }) {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();

    useEffect(() => {
        const channel = supabase
            .channel("realtime Teams")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "Teams",
                },
                () => {
                    router.refresh();
                }
            )

            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase, router]);

    return (
        <div className="grid">
            {teams?.map((team: Team) => (
                <div key={team.id} className="flex px-6 py-4">
                    <Team team={team} />
                </div>
            ))}
        </div>
    );
}

export default RealtimeTeams;
