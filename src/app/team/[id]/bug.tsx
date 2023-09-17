"use client";

import { Database } from "@/lib/database.types";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import {
    ArrowDown,
    ArrowRight,
    ArrowUp,
    FolderDown,
    Trash,
} from "lucide-react";
import ProgressSelect from "./progress-select";
import ConfirmDropdown from "./confirm-dropdown";
type Bug = Database["public"]["Tables"]["Bugs"]["Row"];

const Bug = ({ bug }: { bug: Bug }) => {
    const router = useRouter();

    const markAsArchived = async () => {
        await fetch(`${location.origin}/api/bugs/archive`, {
            method: "put",
            body: JSON.stringify({ id: bug.id }),
        });
        router.refresh();
    };

    return (
        <>
            <TableCell className="font-semibold ">{bug.bug_name}</TableCell>
            <TableCell className="">{bug.bug_description || ""}</TableCell>
            <TableCell className="flex">
                <ProgressSelect
                    value={bug.progress}
                    id={bug.id}
                    router={router}
                />
            </TableCell>
            <TableCell>{bug["priority"]}</TableCell>
            <TableCell>
                <div className="grid grid-flow-col">
                    <ConfirmDropdown question="Delete?">
                        <Button variant={"outline"}>
                            <Trash className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all" />
                        </Button>
                    </ConfirmDropdown>
                    <ConfirmDropdown
                        question="Archive?"
                        confirmEffect={markAsArchived}
                    >
                        <Button variant={"default"}>
                            <FolderDown className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all" />
                        </Button>
                    </ConfirmDropdown>
                </div>
            </TableCell>
        </>
    );
};

function GetPriority({ priority }: { priority?: "Low" | "Medium" | "High" }) {
    const iconStyle = "";
    switch (priority) {
        case "Low":
            return <ArrowDown className={iconStyle} />;
        case "Medium":
            return <ArrowRight className={iconStyle} />;
        case "High":
            return <ArrowUp />;
        default:
            return <div>?</div>;
    }
}

export default Bug;
