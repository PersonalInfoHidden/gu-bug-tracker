import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Check, X } from "lucide-react";

export default function ConfirmDropdown({
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
            <DropdownMenuContent className="">
                <DropdownMenuLabel className="">
                    {question || "Confirm?"}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="grid grid-flow-col">
                    <DropdownMenuItem
                        className="grid bg-primary text-primary-foreground focus:bg-primary/80 focus:text-primary-foreground place-items-center"
                        onClick={confirmEffect}
                    >
                        <Check />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="grid text-center place-items-center">
                        <X />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
