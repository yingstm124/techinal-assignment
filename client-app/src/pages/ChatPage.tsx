import useRealtimeChat from "../websocket/useRealtimeChat";
import { useParams } from "react-router";
import Chat from "../components/Chat";

function ChatPage() {
    const { id } = useParams();
    const { socketRef, chatHistory } = useRealtimeChat(undefined, id, false);

    return <Chat ref={socketRef} chatHistory={chatHistory ?? []} />;
}
export default ChatPage;
