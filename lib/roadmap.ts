import {type Roadmap,type RoadmapStage} from "@/types/roadmap";

  export function parseRoadmap(value: unknown): Roadmap | null {
    if (!value || typeof value !== "object") {
      return null;
    }
  
    const roadmap = value as Record<string, unknown>;
  
    if (
      typeof roadmap.career !== "string" ||
      typeof roadmap.overview !== "string"
    ) {
      return null;
    }
  
    if (!Array.isArray(roadmap.stages)) {
      return null;
    }
  
    // stages 내부 구조 검사
    for (const stage of roadmap.stages) {
      if (!stage || typeof stage !== "object") {
        return null;
      }
  
      const item = stage as Record<string, unknown>;
  
      if (
        typeof item.id !== "number" ||
        typeof item.title !== "string" ||
        typeof item.summary !== "string" ||
        !Array.isArray(item.skills) ||
        !item.skills.every((skill) => typeof skill === "string")
      ) {
        return null;
      }
    }
  
    return roadmap as Roadmap;
  }