"use client";

import React, { useEffect } from "react";
import Bug from "./bug";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Database } from "@/lib/database.types";
import BugsTable from "./bugs-table";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

function RealtimeBugs({ bugs }: { bugs: Bug[] }) {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();

    useEffect(() => {
        const channel = supabase
            .channel("realtime Bugs")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "Bugs",
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
        <div className="border rounded-md ">
            {bugs ? <BugsTable bugs={bugs} /> : <h2>error</h2>}
        </div>
    );
}

export default RealtimeBugs;
