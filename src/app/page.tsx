import { Database } from "@/lib/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { MainNav } from "./main-nav";
import AuthNav from "../components/auth-nav";
import { ModeToggle } from "@/components/mode-toggle";

export default async function Home() {
    const supabase = createServerComponentClient<Database>({
        cookies,
    });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    return (
        <div>
            <nav className="flex justify-between px-12">
                <MainNav className="" />
                <AuthNav />
            </nav>
            <ModeToggle />
            <main>
                <h1 className="text-5xl">
                    Hello,{" "}
                    <span className=" font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-primary to-rose-800">
                        {session?.user.email?.split("@")[0] ?? "User"}
                    </span>
                </h1>
                <h2 className="text-secondary-foreground">
                    Insert dashboard here
                </h2>
                <p className="w-1/5 text-foreground">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Minus soluta harum esse sequi vel voluptatibus facilis
                    similique hic deserunt necessitatibus distinctio molestias
                    quibusdam consectetur possimus neque, architecto explicabo
                    ex perferendis.
                </p>
            </main>
        </div>
    );
}
