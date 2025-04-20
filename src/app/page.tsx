import { getServerSession } from "next-auth";
import { Separator } from "@/components/ui/separator";
import Chat from "./components/Chat";

export default async function Home() {
  const session = await getServerSession();

  console.log(session);

  return (
    <main className="p-5">
      <h1 className="text-4xl font-bold">Welcome to GPT Chat!</h1>
      {!session?.user?.name && <div>You need to login to use this chat</div>}
      {session?.user?.name && (
        <>
        <Separator className="my-5" />
        <Chat />
        </>
      )}
    </main>
  );
}
