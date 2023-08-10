import React from "react";
import { Database } from "@/lib/database.types";
import Link from "next/link";
type Team = Database["public"]["Tables"]["Teams"]["Row"];

function Team({ team }: { team: Team }) {
    return (
        <Link href={`team/${team.id}`} className="p-1 hover:border">
            <div className="border p-4">
                <h1 className="uppercase">{team.name}</h1>
                <span>id: {team.id}</span>
            </div>
        </Link>
    );
}

export default Team;
