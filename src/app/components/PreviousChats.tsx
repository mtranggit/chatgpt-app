import { getChatsWithMessages } from "@/db";
import { getServerSession } from "next-auth";
import Transcript from "./Transcript";
import { Separator } from "@/components/ui/separator";

export default async function PreviousChats() {
	const session = await getServerSession();

	// ensure it's me only 🥳
	const userEmail = session?.user?.name === "Michael Trang" ? "michael.trang@hotmail.com" : "";

	const chats = await getChatsWithMessages(userEmail);


	if (!chats.length) {
		return (
			<div className="flex justify-center">
				<div className="text-gray-500 italic text-2xl">No previous chats.</div>
			</div>
		);
	}
	
	return (
		<div>
			<div className="text-2xl font-bold">Previous Chat Sessions</div>
			<div className="grid grid-cols-1 md:grid-cols-2">
				{chats.map((chat) => (		
					<div key={chat.id} className="m-1 border-2 rounded-xl">
						<a
							href={`/chats/${chat.id}`}
							className="text-lg line-clamp-1 px-5 py-2 text-white bg-blue-900 rounded-t-lg"
						>
							{chat.name}
						</a>
						<div className="p-3">
							<Transcript messages={chat.messages.slice(0, 2)} />
						</div>
					</div>
				))}
			</div>
			<Separator className="mt-5" />
		</div>
	);
}