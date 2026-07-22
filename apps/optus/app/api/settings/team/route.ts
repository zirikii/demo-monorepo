import { NextResponse } from "next/server";
import { addTeamMember, getSettings } from "@/lib/data/settings";
import type { TeamMember } from "@/lib/types";
export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings.team);
}
export async function POST(request: Request) {
  const body = (await request.json()) as Omit<TeamMember, "id" | "status">;
  const member: TeamMember = {
    id: `team-${Date.now()}`,
    name: body.name,
    email: body.email,
    role: body.role,
    status: "Invited",
  };
  return NextResponse.json(await addTeamMember(member));
}
