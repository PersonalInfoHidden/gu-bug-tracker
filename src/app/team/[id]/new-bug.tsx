"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Database } from "@/lib/database.types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

type Bug = Database["public"]["Tables"]["Bugs"]["Insert"];

export default function NewBug({ teamId }: { teamId: number }) {
    const router = useRouter();
    const [formData, setFormData] = useState<Bug>({
        bug_name: "",
        bug_description: "",
        team_id: teamId,
        progress: "Todo",
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData({
            ...formData,
            [id]: value,
        });
    };
    const logBug = async () => {
        console.table(formData);
    };
    const addBug = async (event: React.FormEvent) => {
        if (formData.bug_name === "") {
            event.preventDefault();
            alert("cool");
            return;
        }
        await fetch(`${location.origin}/api/bugs/new`, {
            method: "POST",
            body: JSON.stringify(formData),
        });

        router.refresh();
        return;
    };
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">New Bug</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] DialogContent">
                    <form onSubmit={addBug}>
                        <DialogHeader>
                            <DialogTitle>New Bug</DialogTitle>
                            <DialogDescription>
                                Create a bug component here. Click Add when you
                                are done.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="bug_name"
                                    className="text-right"
                                >
                                    Name
                                </Label>
                                <Input
                                    id="bug_name"
                                    className="col-span-3"
                                    value={formData.bug_name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="bug_description"
                                    className="text-right"
                                >
                                    Desciption
                                </Label>
                                <Textarea
                                    id="bug_description"
                                    className="col-span-3"
                                    value={formData.bug_description ?? ""}
                                    onChange={(
                                        event: React.ChangeEvent<HTMLTextAreaElement>
                                    ) => {
                                        const { id, value } = event.target;
                                        setFormData({
                                            ...formData,
                                            [id]: value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="progress"
                                    className="text-right"
                                >
                                    Progress
                                </Label>
                                <div id="progress" className="col-span-3">
                                    <Select
                                        defaultValue="Todo"
                                        onValueChange={(value: string) => {
                                            setFormData({
                                                ...formData,
                                                ["progress"]: value,
                                            });
                                        }}
                                    >
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Todo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Todo">
                                                Todo
                                            </SelectItem>
                                            <SelectItem value="Started">
                                                Started
                                            </SelectItem>
                                            <SelectItem value="Completed">
                                                Completed
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Add</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
