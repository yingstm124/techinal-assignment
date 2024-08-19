import httpRequest from "../httpRequest";
import { chatHistoryContract } from "./contract/chatHistory.contract";

const chatService = {
  initRoom: (userName: string, senderName: string) =>
    httpRequest.post<string>(`/init-room/${userName}/${senderName}`),
  chatHistory: (roomName: string) =>
    httpRequest.get<chatHistoryContract[]>(`/chat-history/${roomName}`),
};
export default chatService;
