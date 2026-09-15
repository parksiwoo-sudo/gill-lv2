"use client";

import { useEffect, useState } from "react";
import type { Roadmap } from "@/types/roadmap-schema";

export default function ResultForm() {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);

  useEffect(() => {
    const storedRoadmap = sessionStorage.getItem("roadmap");

    if (!storedRoadmap) return;

    const parsedRoadmap: Roadmap = JSON.parse(storedRoadmap);

    setRoadmap(parsedRoadmap);
  }, []);

  if (!roadmap) {
    return <p>로드맵을 불러오는 중...</p>;
  }

  return (
    <main className="result-page">
      <header className="result-header">
        <p className="logo">GILL</p>

        <p className="eyebrow">YOUR CAREER ROADMAP</p>

        <h1>{roadmap.career}</h1>

        
      </header>

      <section className="roadmap">
        {roadmap.stages.map((stage) => (
         <article className="stage-card" key={stage.order_index}>
         <p className="stage-number">
           STEP {String(stage.order_index).padStart(2, "0")}
         </p>

            <h2>{stage.name}</h2>

            

            <div className="items">
              {stage.items.map((item) => (
                <span className="item" key={item.name}>
                  {item.name}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}