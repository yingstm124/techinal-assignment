import httpRequest from "../httpRequest";

const chatService = {
  initRoom: (userName: string, senderName: string) =>
    httpRequest.post(`/init-room/${userName}/${senderName}`),
  chatHistory: (roomName: string) =>
    httpRequest.get(`/chat-history/${roomName}`),
};
export default chatService;
