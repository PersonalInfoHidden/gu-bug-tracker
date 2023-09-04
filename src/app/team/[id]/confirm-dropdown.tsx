import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
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
            <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>{question || "Confirm?"}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="grid grid-flow-col">
                    <DropdownMenuItem
                        className="bg-primary text-primary-foreground focus:bg-primary/80 focus:text-primary-foreground grid place-items-center"
                        onClick={confirmEffect}
                    >
                        <Check />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-center grid place-items-center">
                        <X />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
