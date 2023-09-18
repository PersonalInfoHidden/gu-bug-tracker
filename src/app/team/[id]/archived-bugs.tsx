import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";

const ArchivedBugs = () => {
    const supabase = createServerComponentClient({ cookies });
    return <div>ArchivedBugs</div>;
};

export default ArchivedBugs;
