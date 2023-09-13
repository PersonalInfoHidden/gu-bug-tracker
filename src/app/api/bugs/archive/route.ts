import { Database } from "@/lib/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const { id } = await request.json();

    const supabase = createRouteHandlerClient<Database>({ cookies });
    const { data } = await supabase
        .from("Bugs")
        .update({ progress: "Archived" })
        .match({ id });
    return NextResponse.json(data);
}
