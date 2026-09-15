import { z } from "zod";

const RoadmapItemSchema = z.object({
    name: z.string(),
  });

  const RoadmapStageSchema = z.object({
    name: z.string(),
    order_index: z.number(),
    items: z.array(RoadmapItemSchema),
  });
  export const RoadmapSchema = z.object({
    career: z.string(),
    stages: z.array(RoadmapStageSchema),
  });

  export type Roadmap = z.infer<typeof RoadmapSchema>; 