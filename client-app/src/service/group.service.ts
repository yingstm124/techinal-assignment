import httpRequest from "../httpRequest";
import { groupContract } from "./contract/group.contract";

const groupService = {
  createGroup: (roomName: string, userName: string) =>
    httpRequest.post<groupContract>(`/group/${roomName}/${userName}`),
  deleteGroup: (roomName: string, userName: string) =>
    httpRequest.delete(`/group/${roomName}/${userName}`),
};
export default groupService;
