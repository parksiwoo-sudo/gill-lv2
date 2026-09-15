import { createClient } from "@/lib/supabase/server";
import LogoutButton from "../../component/logoutbutton";
export default async function UsersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("현재 로그인 사용자:", user);
  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_user_id", user.id);
  const { data: roadmaps, error: roadmapError } = await supabase
    .from("user_roadmaps")
    .select(`
      id,
      user_id,
      career_id,
      careers (
        id,
        name
      ),
      user_roadmap_stages(
        id,
        user_roadmap_id,
        source_stage_id,
        name,
        user_roadmap_items (
          id,
          name,
          is_completed,
          completed_at
        )
      )
    `)
    

    console.log("roadmaps:", JSON.stringify(roadmaps, null, 2));
    console.log("roadmapError:", roadmapError);
  
  if (error) {
    return <div>오류: {error.message}</div>;
  }

  return (
    <main style={{ color: "red" }}>
      <h1>Users</h1>

      {data.map((user) => (
        <div key={user.id}>
          {user.id} / {user.name} / {user.email} / {user.age}
        </div>
      ))}
      <LogoutButton />
    </main>
  );
}