export type RoadmapStage={
    id: number;
    title: string;
    summary: string;
    skills: string[];
}
export type Roadmap = {
    career: string;
    overview: string;
    stages: RoadmapStage[];
  };
  