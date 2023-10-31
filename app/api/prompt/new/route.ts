import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

interface CustomRequest {
  json: () => Promise<{ userId: string; prompt: string; tag: string }>;
}

export const POST = async (req: CustomRequest) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    return new Response("Failed to create a new promot", { status: 500 });
  }
};
