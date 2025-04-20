"use server";

import OpenAI from "openai";
// import { getServerSession } from "next-auth";


const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY!,
});

type Message = {
	role: "user" | "assistant";
	content: string;
}

export async function getCompletion(
	messageHistory: Message[]
) {


	const response = await openai.chat.completions.create({
		model: "gpt-4o",
		messages: messageHistory.map((message) => ({
			role: message.role,
			content: message.content,
		})),
	});

	const messages = [
		...messageHistory,
		response.choices[0].message.content as unknown as Message,
	];

	return {
		messages
	}
}
