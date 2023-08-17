import { Database } from "@/lib/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

type Bug = Database["public"]["Tables"]["Bugs"]["Insert"];

// This function is just here to make error returns easier
const errorCreator = (
    errMsg: string | undefined,
    httpStatus: number
): NextResponse => {
    return NextResponse.json(errMsg ? { error: errMsg } : null, {
        status: httpStatus,
    });
};

// this route is for creating and validating a new bug and inserting it into the database
export async function POST(request: Request) {
    // validates request
    if (!request) return errorCreator("No Data", 406);

    const supabase = createRouteHandlerClient<Database>({ cookies });
    const {
        data: { session },
    } = await supabase.auth.getSession();
    let isMember: boolean = false;
    let respose = null;

    if (!session) return errorCreator("No session data", 401);

    const bug: Bug = await request.json();

    // if there is no team to bind the bug to
    if (!bug.team_id) return errorCreator("No Team id", 406);

    // get the team id with the members
    const team = await supabase
        .from("Teams")
        .select("members")
        .eq("id", bug.team_id)
        .limit(1)
        .single();

    // check if there is a team and if user is part of that team
    if (team.data && team.data.members) {
        const id = session.user.id || "";
        if (team.data.members.includes(id)) {
            isMember = true;

            // also add uid to the bug listing
            bug["worker_id"] = id;
        }
    }

    if (isMember) {
        respose = await supabase.from("Bugs").insert(bug).select();
        console.log(respose);
    }

    return NextResponse.json(respose ? ["data"] : null, {
        status: respose?.status ?? 400,
    });
}
