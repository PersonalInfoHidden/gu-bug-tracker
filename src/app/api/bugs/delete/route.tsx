import { Database } from "@/lib/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    const { id } = await request.json();
    const supabase = createRouteHandlerClient<Database>({ cookies });
    if (!id) return NextResponse.json("error", { status: 406 });
    try {
        const { data, error } = await supabase
            .from("Bugs")
            .delete()
            .eq("id", id);
        if (error) return NextResponse.json(error, { status: 500 });
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
