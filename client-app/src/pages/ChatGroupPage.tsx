import { useParams } from "react-router";
import useRealtimeChat from "../websocket/useRealtimeChat";
import Chat from "../components/Chat";

function ChatGroupPage() {
    const { id: roomName } = useParams();
    const { socketRef, chatHistory } = useRealtimeChat(
        roomName,
        undefined,
        true
    );

    return <Chat ref={socketRef} chatHistory={chatHistory ?? []} />;
}
export default ChatGroupPage;
