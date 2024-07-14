import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';


// READ
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params).populate('creator');
        if (!prompt) {
            return new Response(
                "Prompt not found",
                { status: 400 }
            )
        }
        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response(
            `Failed to fetch: ${error}`,
            { status: 500 }
        )
    }
}


// UPDATE
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) {
            return new Response(
                "Prompt not found",
                { status: 404 }
            )
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();

        return new Response(
            JSON.stringify(existingPrompt),
            { status: 200 }
        )
    } catch (error) {
        return new Response(
            `Failed to patch prompt: ${error}`,
            { status: 500 }
        )
    }
}


export const DELETE = async (request, { parmas }) => {
    
}