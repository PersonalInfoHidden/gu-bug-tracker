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
    FolderArchive,
    FolderDown,
    Trash,
} from "lucide-react";
import ProgressSelect from "./progress-select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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

    const changeProgress = async (progress: string) => {
        await fetch(`${location.origin}/api/bugs/progress`, {
            method: "put",
            body: JSON.stringify({ progress, id: bug.id }),
        });
        router.refresh();
    };

    const deleteBug = async () => {
        await fetch(`${location.origin}/api/bugs/delete`, {
            method: "delete",
            body: JSON.stringify({ id: bug.id }),
        });
        router.refresh();
    };

    return (
        <>
            <TableCell className="text-lg font-semibold">
                {bug.bug_name}
            </TableCell>
            <TableCell className="">{bug.bug_description || ""}</TableCell>
            <TableCell className="flex">
                <ProgressSelect
                    value={bug.progress}
                    selectEffect={changeProgress}
                />
            </TableCell>
            <TableCell>
                <div className="flex items-center font-bold capitalize gap-x-2">
                    {GetPriority({ priority: bug.priority })}
                    <span>{bug.priority}</span>
                </div>
            </TableCell>
            <TableCell>
                <div className="grid grid-flow-col gap-x-2">
                    <TableAction confirmAction={deleteBug}>
                        <Button>
                            <Trash />
                        </Button>
                    </TableAction>

                    <TableAction confirmAction={markAsArchived}>
                        <Button variant="outline">
                            <FolderArchive />
                        </Button>
                    </TableAction>
                </div>
            </TableCell>
        </>
    );
};

function GetPriority({ priority }: { priority?: string }) {
    const iconStyle = "font-bold";
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

function TableAction({
    title,
    desctiption,
    cancelName,
    actionName,
    confirmAction,
    children,
}: {
    title?: string;
    desctiption?: string;
    cancelName?: string;
    actionName?: string;
    confirmAction?: () => void;
    children?: React.ReactNode;
}) {
    return (
        <AlertDialog>
            {children ? (
                <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
            ) : (
                <AlertDialogTrigger>Open</AlertDialogTrigger>
            )}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {title || "Are you absolutely sure?"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {desctiption ||
                            `This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.`}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        {cancelName || `Cancel`}
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={confirmAction}>
                        {actionName || `Continue`}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default Bug;
