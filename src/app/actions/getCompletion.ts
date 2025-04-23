"use server";

import OpenAI from "openai";
import { getServerSession } from "next-auth";
import { createChat, updateChat } from "@/db";


const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY!,
});

type Message = {
	role: "user" | "assistant";
	content: string;
}

export async function getCompletion(
	id: number | null,
	messageHistory: Message[]
) {


	const response = await openai.chat.completions.create({
		model: "gpt-4o",
		// model: "gpt-3.5-turbo",
		messages: messageHistory.map((message) => ({
			role: message.role,
			content: message.content,
		})),
	});

	const messages = [
		...messageHistory,
		response.choices[0].message.content as unknown as Message,
	];

	const session = await getServerSession();
	let chatId = id;
	if (!chatId) {
		chatId = await createChat(
			session?.user?.email || session?.user?.name || 'michael.trang@hotmail.com',
			messageHistory[0].content,
			messages
		);
	} else {
		await updateChat(chatId, messages);
	}

	return {
		messages,
		id: chatId,
	}
}
