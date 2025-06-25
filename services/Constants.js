import { LayoutDashboard,Calendar, List, Settings, Code2Icon, User2Icon, BriefcaseBusinessIcon, Puzzle, Component } from "lucide-react";

export const SidebarOptions = [
    {
        name: "Dashboard",
        icon:LayoutDashboard,
        href: "/dashboard"
    },
    {
        name: "Schedule Interview",
        icon:Calendar,
        href: "/schedule-interview"
    },
    {
        name: "All Interviews",
        icon:List,
        href: "/all-interviews"
    },
    {
        name: "Settings",
        icon:Settings,
        href: "/settings"
    },
]

export const InterviewType = [
    {
        title: "Technical",
        icon: Code2Icon
    },
    {
        title: "Behavioral",
        icon: User2Icon
    },
    {
        title: 'Experience',
        icon: BriefcaseBusinessIcon
    },
    {
        title: 'Problem Solving',
        icon: Puzzle
    },
    {
        title: 'Leadership',
        icon: Component
    }
]

export const QUESTION_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description:{{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

📝 Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.
❌ Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
  question:"",
  type:'Technical/Behavioral/Experince/Problem Solving/Leaseship'
},{
...
}]
🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`


export const FEEDBACK_PROMPT=`{{conversation}}

Based on this interview conversation between assistant and user, give me feedback for the user interview. 

IMPORTANT: Consider total number of questions, how many questions were asked by the assistant and how many were actually answered by the user. If the user did not answer most of the questions, or gave very short or incomplete answers, lower the ratings accordingly. Be strict about partial or missing answers.

Give me a rating out of 10 for Technical Skills, Communication, Problem Solving, and Experience. Also give me a summary in 3 lines about the interview and one line to let me know whether the candidate is recommended for hire or not, with a message. Give me the response in JSON format.

{
    feedback:{
        rating:{
            technicalSkills: 5,
            communication: 6,
            problemSolving: 4,
            experience: 7,
            totalRating: 5
        },
        summary: <in 3 lines>,
        Recommendation: '',
        RecommendationMsg: ''
    }
}
`