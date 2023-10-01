import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import Bug from "./bug";

export default function ProgressSelect({
    value,
    selectEffect,
}: {
    value: Bug["progress"];
    selectEffect?: any;
}) {
    return (
        <Select onValueChange={selectEffect}>
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
