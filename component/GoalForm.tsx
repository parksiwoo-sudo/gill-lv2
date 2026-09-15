"use client";
import type { Roadmap } from "../types/roadmap";
import {useState,type FormEvent} from "react";

export function GoalForm(){
    const [input,setInput] = useState("");
    
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
      
        const trimmedInput = input.trim()
        if (!trimmedInput) return;
        
        const response= await fetch("/api/roadmap",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                input:trimmedInput,
            }),
        });

        if (!response.ok) {
            return;
        }
  
        const roadmap: Roadmap = await response.json();
        sessionStorage.setItem("roadmap", JSON.stringify(roadmap));

        window.location.href = "/result";
      }
      return (
        <main className="goal-page">
          <form className="goal-form" onSubmit={handleSubmit}>
            <p className="goal-logo">GILL</p>
      
            <p className="goal-eyebrow">
              CAREER ROADMAP
            </p>
      
            <h1>
              당신의 꿈을 입력하세요.
            </h1>
      
            <p className="goal-description">
              Gill이 당신의 목표를 향한 길을 제시해드립니다.
            </p>
      
            <div className="goal-input-wrapper">
              <input
                type="text"
                placeholder="예: AI Product Engineer"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
      
              <button type="submit">
                →
              </button>
            </div>
          </form>
        </main>
      );
}
