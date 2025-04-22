import Chat from "@/app/components/Chat";
import { getChat } from "@/db";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ChatDetail({
  params,
}: {
  params: Promise<{ chatId: string }>;
}) {
  const chatId = await params;
  const chat = await getChat(+chatId);
  if (!chat) {
    return notFound();
  }

  const session = await getServerSession();
  if (!session || chat?.user_email !== session?.user?.email) {
    return redirect("/");
  }

  return (
    <main className="pt-5">
      <Chat id={+chatId} messages={chat?.messages || []} key={+chatId} />
    </main>
  );
}
