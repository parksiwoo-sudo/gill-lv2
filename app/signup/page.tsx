"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSignup() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    
    const { error: profileError } = await supabase
      .from("users")
      .insert({
        name,
        email,
        auth_user_id: data.user?.id,
      });

    if (profileError) {
      alert(profileError.message);
      return;
    }
    alert("회원가입 성공!");
  }

  return (
    <main>
      <h1>회원가입</h1>

      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>
        회원가입
      </button>
    </main>
  );
}