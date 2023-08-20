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

function BugsTable({ bugs }: { bugs: Bug[] }) {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-1/5">Bug Name</TableHead>
                        <TableHead className="w-96">Description</TableHead>
                        <TableHead>Completed</TableHead>
                        <TableHead className=" ">Progress</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead />
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bugs?.map((bug: Bug) => (
                        <TableRow key={bug.id} className="">
                            <Bug bug={bug} />
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}

export default BugsTable;
