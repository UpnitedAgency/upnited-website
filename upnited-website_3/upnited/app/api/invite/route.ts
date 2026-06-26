import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return NextResponse.json({ error: "Only admins can create invites" }, { status: 403 });
  }

  const { email, role } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const { data: invite, error } = await supabase
    .from("invites")
    .insert({
      email,
      role: role ?? "employee",
      created_by: user.id,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const inviteLink = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://upnited.com"}/workspace/signup?token=${invite.token}`;

  return NextResponse.json({ invite, inviteLink });
}
