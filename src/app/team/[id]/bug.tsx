"use client";

import { Database } from "@/lib/database.types";
import { useRouter } from "next/navigation";
import React from "react";
type Bug = Database["public"]["Tables"]["Bugs"]["Row"];

function Bug({ bug }: { bug: Bug }) {
    const router = useRouter();

    const markAsComplete = async () => {
        await fetch(`${location.origin}/bugs`, {
            method: "put",
            body: JSON.stringify({ id: bug.id }),
        });
        router.refresh();
    };

    return (
        <div>
            <h1>{bug.bug_name}</h1>
            <p>{bug.bug_description}</p>
            <span>Is completed: {JSON.stringify(bug.completed)}</span>
            <button onClick={markAsComplete}>Completed</button>
        </div>
    );
}

export default Bug;
