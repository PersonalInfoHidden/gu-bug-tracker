import { Database } from "@/lib/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const { id, progress } = await request.json();

    switch (progress) {
        case "Not Started":
        case "Started":
        case "Completed":
            const supabase = createRouteHandlerClient<Database>({ cookies });
            const { data } = await supabase
                .from("Bugs")
                .update({ progress: progress })
                .match({ id });
            return NextResponse.json(data);
        default:
            return NextResponse.json(
                { error: "Insufficient Data" },
                {
                    status: 406,
                }
            );
    }
}
