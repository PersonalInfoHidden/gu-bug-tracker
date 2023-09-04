import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@radix-ui/react-select";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import Bug from "./bug";

export default function ProgressSelect({
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
