import { NextRequest, NextResponse } from "next/server";
import { parseRoadmap } from "@/lib/roadmap";

const SystemPrompt = `
너는 사용자의 커리어 목표를 분석하고 현실적인 학습 및 성장 로드맵을 설계하는 커리어 코치다.

사용자가 입력한 커리어 목표를 바탕으로 다음 원칙에 따라 로드맵을 작성한다.

1. 사용자의 목표를 구체적으로 해석한다.
2. 목표를 달성하기 위해 필요한 핵심 단계를 논리적인 순서로 구성한다.
3. 각 단계에는 실제로 습득해야 할 지식과 기술을 포함한다.
4. 너무 추상적인 표현보다는 실제 학습하거나 경험할 수 있는 기술과 역량을 제시한다.
5. 초보자가 시작한다고 가정하고 기초에서 고급 단계로 점진적으로 발전하도록 구성한다.
6. 각 단계의 summary는 해당 단계에서 무엇을 배우고 왜 필요한지 간결하게 설명한다.
7. skills에는 해당 단계에서 중요한 기술이나 역량을 3~6개 정도 제시한다.
8. 사용자의 목표와 직접적인 관련성이 낮은 내용은 불필요하게 포함하지 않는다.
9. 전체 로드맵은 현실적으로 실행 가능한 수준으로 작성한다.
10. 결과는 주어진 JSON Schema의 구조를 정확하게 따른다.
11. 한국어로 답변을 작성한다.
`;

 export async function POST( request:Request){
    try{
        const body = await request.json();
        const input = typeof body.input === "string" ? body.input.trim():"";

        if(!input){
            return NextResponse.json(
                { error:"목표를 입력해주세요."},
                { status: 400},
            );
        }


            const apikey = process.env.OPENAI_API_KEY;
            console.log("API Key exists:", !!process.env.OPENAI_API_KEY);
            console.log(
                "API Key prefix: ",
                process.env.OPENAI_API_KEY?.slice(0,15)
            );

        if(!apikey){
            return NextResponse.json(
                {error: "OpenAI API 키가 설정되지 않았습니다."},
                {status: 500},
            )
            
        }

        const openaiResponse=await fetch(
            "https://api.openai.com/v1/responses",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${apikey}`,   
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    instructions: SystemPrompt,
                    input: `커리어 목표: ${input}`,
                    text: {
                        format: {
                          type: "json_schema",
                          name: "career_roadmap",
                          strict: true,
                          schema: {
                            type: "object",
                            properties: {
                              career: {
                                type: "string",
                              },
                              overview: {
                                type: "string",
                              },
                              stages: {
                                type: "array",
                                items: {
                                  type: "object",
                                  properties: {
                                    id: {
                                      type: "number",
                                    },
                                    title: {
                                      type: "string",
                                    },
                                    summary: {
                                      type: "string",
                                    },
                                    skills: {
                                      type: "array",
                                      items: {
                                        type: "string",
                                      },
                                    },
                                  },
                                  required: ["id", "title", "summary", "skills"],
                                  additionalProperties: false,
                                },
                              },
                            },
                            required: ["career", "overview", "stages"],
                            additionalProperties: false,
                          },
                        },
                      }
                    })
            }
        )
        
        console.log("Status:", openaiResponse.status);
        console.log(apikey.length);
        console.log(apikey.slice(0,20));
        console.log(apikey.slice(-10));

        if(!openaiResponse.ok){
            const errorBody= await openaiResponse.text();

            console.error("OpenAI API error:",errorBody);

            return NextResponse.json(
                {
                    error:"로드맵 생성 실패",
                    detail:errorBody,
                },
                { status: openaiResponse.status},
            );
        }
        
        const completion = await openaiResponse.json();
        
        const content = completion.output[0].content[0].text;
        

        if (!content){
            return NextResponse.json(
                {error:"로드맵을 생성하지 못했습니다."},
                {status:502},
            );
        }

        const parsed = JSON.parse(content )as unknown;
       
        const roadmap=parseRoadmap(parsed);
       

        if(!roadmap){
            return NextResponse.json(
                {error:"로드맵의 데이터가 올바르지 않습니다. 잠시 후 다시 시도해주세요. "},
                {status:502},
            );
        }

        return NextResponse.json(roadmap);
        }
    catch(error){
        console.error("Roadmap generation error: ",error);
        return NextResponse.json(
            { error: "서버 오류가 발생했습니다."},
            { status:500},
        );
 
    }
} 