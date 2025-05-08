import { generateText } from "ai";
import { google } from "@ai-sdk/google";

import { db } from "@/firebase/admin";
import { getRandomLearningCover } from "@/lib/utils";

export async function POST(request: Request) {
  const { background, topic, level, type, amount, userid } =
    await request.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `You are an AI tutor helping a student learn a specific topic.
        The student's background is: ${background}. 
        They want to learn about: ${topic}.
        The questions should be ${level} level.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    const learn = {
      type: type,
      background: background,
      topic: topic,
      level: level,
      questions: JSON.parse(questions),
      userId: userid,
      finalized: true,
      coverImage: getRandomLearningCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("learns").add(learn);
    console.log(learn);

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return Response.json({ success: false, error: error }, { status: 500 });
  }
}

export async function GET() {
  return Response.json({ success: true, data: "Thank you!" }, { status: 200 });
}
