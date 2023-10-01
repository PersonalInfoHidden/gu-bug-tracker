import { Database } from "@/lib/database.types";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

//
// this code is a consequence of me being lazy and therefore not refactoring my code
//
// does not update on db-changes
//
// fetches data twice 💀💀
//

const ArchivedBugs = async ({ id }: { id: number }) => {
    const supabase = createServerComponentClient<Database>({ cookies });
    const { data: bugs } = await supabase
        .from("Bugs")
        .select("*")
        .eq("team_id", Number(id))
        .like("progress", "Archived");

    return (
        <div className="grid">
            {bugs?.map((value) => (
                <React.Fragment key={value.id}>
                    <span>{value.bug_name}</span>
                </React.Fragment>
            )) || ""}
        </div>
    );
};

export default ArchivedBugs;
