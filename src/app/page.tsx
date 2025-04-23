import { getServerSession } from "next-auth";
import { Separator } from "@/components/ui/separator";
import Chat from "./components/Chat";
import { Suspense } from "react";
import PreviousChats from "./components/PreviousChats";

export default async function Home() {
  const session = await getServerSession();

  // console.log(session);

  return (
    <main className="p-5">
      <h1 className="text-4xl font-bold">Welcome to GPT Chat!</h1>
      {!session?.user?.name && <div>You need to login to use this chat</div>}
      {session?.user?.name && (
        <>
          <Suspense fallback={<div>Loading Previous Chats</div>}>
            <PreviousChats />
          </Suspense>

          <h4 className="mt-5 text-2xl font-bold">New Chat Session</h4>
          <Separator className="my-5" />
          <Chat />
        </>
      )}
    </main>
  );
}
