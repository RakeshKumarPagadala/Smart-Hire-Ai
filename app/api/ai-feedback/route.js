import { FEEDBACK_PROMPT } from "@/services/Constants.js";
import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { conversation } = await req.json();

    const FINAL_PROMPT = FEEDBACK_PROMPT.replace("{{conversation}}", JSON.stringify(conversation));

    try {
        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,
        })
        const completion = await openai.chat.completions.create({
            model: "deepseek/deepseek-chat-v3-0324:free",
            messages: [
              { role: "user", content: FINAL_PROMPT }
            ],
          })
          // Ensure clean JSON for frontend parsing
          let content = completion.choices[0].message.content;
          // Try to extract JSON from the response
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            content = '```json' + jsonMatch[0] + '```';
          }
          return NextResponse.json({ content });
    
        }catch(error){
            console.log(error)
            return NextResponse.json(error)
        }
        
}
