"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Fragment, ReactNode } from "react";
import { usePathname } from "next/navigation";

export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const routes = [
        ["Home", "/"],
        ["Teams", "/team"],
    ];
    return (
        <nav
            className={cn(
                "flex items-center space-x-4 lg:space-x-6",
                className
            )}
            {...props}
        >
            {routes.map((value, index) => {
                return (
                    <Fragment key={index}>
                        <NavLink href={value[1]} active={pathname === value[1]}>
                            {value[0]}
                        </NavLink>
                    </Fragment>
                );
            })}
        </nav>
    );
}

function NavLink({
    href,
    children,
    active,
}: {
    href: string;
    children?: ReactNode;
    active?: boolean;
}) {
    return (
        <Link
            href={href}
            className={cn(
                "text-lg font-medium  transition-colors hover:text-primary",
                active ? "" : "text-muted-foreground"
            )}
        >
            {children}
        </Link>
    );
}
