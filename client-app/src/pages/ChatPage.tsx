import useRealtimeChat from "../websocket/useRealtimeChat";

function ChatPage() {
    const { socketRef } = useRealtimeChat();

    const sendMsg = () => {
        socketRef.current?.emit("conversation", {
            userId: "1",
            receiverId: "2",
            message: "Hello" + Date.now().toString(),
        });
    };

    return (
        <>
            Chat app <button onClick={sendMsg}>Send</button>
        </>
    );
}
export default ChatPage;
