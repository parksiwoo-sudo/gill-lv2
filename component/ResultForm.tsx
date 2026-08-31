"use client";

import { useEffect, useState } from "react";
import type { Roadmap } from "@/types/roadmap";

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

        <p className="overview">
          {roadmap.overview}
        </p>
      </header>

      <section className="roadmap">
        {roadmap.stages.map((stage) => (
          <article className="stage-card" key={stage.id}>
            <p className="stage-number">
              STEP {String(stage.id).padStart(2, "0")}
            </p>

            <h2>{stage.title}</h2>

            <p className="stage-summary">
              {stage.summary}
            </p>

            <div className="skills">
              {stage.skills.map((skill) => (
                <span className="skill" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}