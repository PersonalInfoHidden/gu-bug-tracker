"use client";

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
                        <TableHead className="w-16">id</TableHead>
                        <TableHead className="w-1/5">Bug Name</TableHead>
                        <TableHead className="w-96">Description</TableHead>
                        <TableHead>Completed</TableHead>
                        <TableHead className="text-right ">Progress</TableHead>
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
