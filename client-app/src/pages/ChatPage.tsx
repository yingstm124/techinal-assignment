import useRealtimeChat from "../websocket/useRealtimeChat";
import { useParams } from "react-router";
import Chat from "../components/Chat";

function ChatPage() {
  const { id } = useParams();
  const { chatHistory, isConnected } = useRealtimeChat(undefined, id, false);

  return <Chat chatHistory={chatHistory ?? []} isConnected={isConnected} />;
}
export default ChatPage;
