"use client";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    console.log("로그아웃 성공");
  }

  return (
    <button onClick={handleLogout}>
      로그아웃
    </button>
  );
}