import React from "react";
import Bug from "./bug";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function RealtimeBugs({ bugs }: { bugs: Bug[] }) {
    return (
        <div>
            <Table className="">
                <TableHeader>
                    <TableRow>
                        <TableHead>id</TableHead>
                        <TableHead className="w-64">Bug Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Completed</TableHead>
                        <TableHead className="text-right">Progress</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bugs?.map((bug: Bug, index: number) => (
                        <TableRow key={bug.id} className="">
                            <Bug bug={bug} index={index} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
