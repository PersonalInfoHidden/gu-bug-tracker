import React from "react";
import Bug from "./bug";

export default function RealtimeBugs({ bugs }: { bugs: Bug[] }) {
    return (
        <div>
            {bugs?.map((bug: Bug) => (
                <div key={bug.id}>
                    <Bug bug={bug} />
                </div>
            ))}
        </div>
    );
}
