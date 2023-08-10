"use client";

import { Database } from "@/lib/database.types";
import { useRouter } from "next/navigation";
import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
type Bug = Database["public"]["Tables"]["Bugs"]["Row"];

function Bug({ bug }: { bug: Bug }) {
    const router = useRouter();

    const markAsComplete = async () => {
        await fetch(`${location.origin}/bugs/completed`, {
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
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Progress" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="Started">Started</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}

export default Bug;
