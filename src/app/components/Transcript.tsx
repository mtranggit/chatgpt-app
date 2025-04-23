import { Message } from "@/types";

const truncateText = (text: string, length: number) => {
	if (text.length > length) {
		return text.slice(0, length) + "...";
	}
	return text;
}

export default function Transcript(
	{ messages, truncate = true }: { messages: Message[]; truncate?: boolean }
) {
	return (
		<div className="flex flex-col gap-2">
			{messages.map((message, index) => (
				<div
					key={index}
					className={`flex flex-col ${
						message.role === "user" ? "items-end" : "items-start"
					}`}
				>
					<div
						className={`${
							message.role === "user"
								? "bg-blue-500"
								: "bg-gray-500 text-black"
						} rounded-md py-2 px-8`}
					>
						{truncate ? truncateText(message.content, 200) + "..." : message.content}
					</div>
				</div>
			))}
		</div>
	);
}