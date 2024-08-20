import { useParams } from "react-router";
import useRealtimeChat from "../websocket/useRealtimeChat";
import Chat from "../components/Chat";

function ChatGroupPage() {
  const { id: roomName } = useParams();
  const { chatHistory, signal, isConnected } = useRealtimeChat(
    roomName,
    undefined,
    true
  );

  return (
    <Chat
      chatHistory={chatHistory ?? []}
      signal={signal}
      isConnected={isConnected}
    />
  );
}
export default ChatGroupPage;
