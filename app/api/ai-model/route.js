import OpenAI from "openai";
import { NextResponse } from "next/server";
import { QUESTION_PROMPT } from "@/services/Constants";

export async function POST(req) {
    // Debug: check if the env variable is present
    console.log("OPENROUTER_API_KEY:", process.env.OPENROUTER_API_KEY ? "present" : "MISSING");

    const {jobPosition,jobDescription,interviewDuration,type} = await req.json()

    const FINAL_PROMPT = QUESTION_PROMPT.replace("{{jobTitle}}",jobPosition)
    .replace("{{jobDescription}}",jobDescription)
    .replace("{{duration}}",interviewDuration)
    .replace("{{type}}",type)
    console.log(FINAL_PROMPT)
    
    try{
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
      return NextResponse.json(completion.choices[0].message)

    }catch(error){
        console.log(error)
        return NextResponse.json(error)
    }
    
}
