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
import { Check, FolderDown, Trash, X } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
type Bug = Database["public"]["Tables"]["Bugs"]["Row"];

const Bug = ({ bug }: { bug: Bug }) => {
    const router = useRouter();

    const markAsArchived = async () => {
        await fetch(`${location.origin}/api/bugs/completed`, {
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
                    <ConfirmDropdown question="Archive?">
                        <Button onClick={markAsArchived} variant={"default"}>
                            <FolderDown className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all" />
                        </Button>
                    </ConfirmDropdown>
                </div>
            </TableCell>
        </>
    );
};

function ConfirmDropdown({
    children,
    question,
    confirmEffect,
}: {
    children?: React.ReactNode;
    question?: string;
    confirmEffect?: any;
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>{question || "Confirm?"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="grid grid-flow-col">
                    <DropdownMenuItem
                        className="bg-primary focus:bg-primary/80"
                        onClick={confirmEffect}
                    >
                        <Check />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="bg-card focus:opacity-95 text-center">
                        <X />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function ProgressSelect({
    value,
    id,
    router,
}: {
    value: Bug["progress"];
    id: Bug["id"];
    router: AppRouterInstance;
}) {
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
                <SelectItem value="Todo">Todo</SelectItem>
                <SelectItem value="Started">Started</SelectItem>
                <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
        </Select>
    );
}

export default Bug;
