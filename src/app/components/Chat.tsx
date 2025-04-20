"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Message } from "../../../types";
import { getCompletion } from "../actions/getCompletion";
import { useState } from "react";


export default function Chat() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [message, setMessage] = useState<string>("");

	const onClick = async () => {
		// Handle the send button click
		const completions = await getCompletion([
			...messages,
			{
				role: "user",
				content: message,
			}
		]);

		setMessages(completions.messages);
		setMessage("");
	};


	return (
		<div className="flex flex-col">
			{messages.map((message, index) => (
				<div key={index} className={`mb-5 flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
					<div className={`${message.role === "user" ? "bg-blue-500" : "bg-gray-500 text-black"
            } rounded-md py-2 px-8`}
						>						
						{message.content}
					</div>
				</div>
			))}
			{/* <form className="flex mt-3" onSubmit={() => {}}> */}
				<Input
					className="flex-grow text-xl"
					placeholder="Question"
					autoFocus
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							onClick();
						}
					}}
				/>
				<Button type="button" onClick={onClick} className="text-xl mt-3">
					Send
				</Button>
			{/* </form> */}
		</div>
	);
}