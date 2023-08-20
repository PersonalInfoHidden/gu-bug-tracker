"use client";

import React from "react";
import { Database } from "@/lib/database.types";
import Link from "next/link";
type Team = Database["public"]["Tables"]["Teams"]["Row"];

function Team({ team }: { team: Team }) {
    return (
        <Link
            href={`/team/${team.id}`}
            className="p-1 transition hover:scale-90"
        >
            <div className="border p-4">
                <h1 className="uppercase">{team.name}</h1>
                {team.paid ? (
                    <></>
                ) : (
                    <h2 className="bg-accent bg-opacity-0 text-primary px-3 py-1 rounded-md font-bold">
                        Free
                    </h2>
                )}
            </div>
        </Link>
    );
}

export default Team;
