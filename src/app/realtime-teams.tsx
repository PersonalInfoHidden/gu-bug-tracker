import React from "react";
import Team from "./team";

function RealtimeTeams({ teams }: { teams: Team[] }) {
    return (
        <div className="grid">
            {teams?.map((team: Team) => (
                <div key={team.id} className="flex px-6 py-4">
                    <Team team={team} />
                </div>
            ))}
        </div>
    );
}

export default RealtimeTeams;
