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
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
type Bug = Database["public"]["Tables"]["Bugs"]["Row"];

const ProgressSelect = ({
    value,
    id,
    router,
}: {
    value: Bug["progress"];
    id: Bug["id"];
    router: AppRouterInstance;
}) => {
    const changeProgress = async (progress: string) => {
        await fetch(`${location.origin}/bugs/progress`, {
            method: "put",
            body: JSON.stringify({ progress, id: id }),
        });
        router.refresh();
    };
    return (
        <Select onValueChange={changeProgress}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={value} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="Started">Started</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
        </Select>
    );
};

function Bug({ bug, index }: { bug: Bug; index: number }) {
    const router = useRouter();

    const markAsComplete = async () => {
        await fetch(`${location.origin}/bugs/completed`, {
            method: "put",
            body: JSON.stringify({ id: bug.id }),
        });
        router.refresh();
    };

    return (
        <>
            <TableCell>{index}</TableCell>
            <TableCell className="font-semibold">{bug.bug_name}</TableCell>
            <TableCell className="">{bug.bug_description}</TableCell>
            <TableCell>Is completed: {JSON.stringify(bug.completed)}</TableCell>
            <TableCell className="flex justify-end">
                <ProgressSelect
                    value={bug.progress}
                    id={bug.id}
                    router={router}
                />
            </TableCell>
        </>
    );
}

export default Bug;
