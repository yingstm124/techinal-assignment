import httpRequest from "../httpRequest";

const groupService = {
    createGroup: (roomName: string, userName: string) =>
        httpRequest.post(`/group/${roomName}/${userName}`),
    deleteGroup: (roomName: string, userName: string) =>
        httpRequest.delete(`/group/${roomName}/${userName}`),
};
export default groupService;
