import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const GET = async (request: Request, { params }: any) => {
  const searchValue = params.search;
  try {
    await connectToDB();
    let prompt;
    prompt = await Prompt.find({ tag: searchValue }).populate("creator");
    if (!prompt || !prompt?.length) {
      prompt = await Prompt.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "creator",
            foreignField: "_id",
            as: "creator",
          },
        },
        {
          $unwind: "$creator",
        },
        {
          $match: {
            "creator.username": searchValue,
          },
        },
      ]);
    }

    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (err) {
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
