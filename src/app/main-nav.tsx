"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Fragment, ReactNode } from "react";
import { usePathname } from "next/navigation";

//
export function MainNav({
    prefetch,
    className,
    ...props
}: {
    prefetch?: boolean;
} & React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const routes = [
        ["Home", "/"],
        ["Teams", "/team"],
    ];

    const linkMap = routes.map((value, index) => {
        return (
            <Fragment key={index}>
                <NavLink
                    href={value[1]}
                    active={pathname === value[1]}
                    prefetch={prefetch}
                >
                    {value[0]}
                </NavLink>
            </Fragment>
        );
    });
    return (
        <nav
            className={cn(
                "flex items-center space-x-4 lg:space-x-6",
                className
            )}
            {...props}
        >
            {linkMap}
        </nav>
    );
}

function NavLink({
    href,
    children,
    active,
    prefetch,
}: {
    href: string;
    children?: ReactNode;
    active?: boolean;
    prefetch?: boolean;
}) {
    return (
        <Link
            prefetch={prefetch}
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
