import httpRequest from "../httpRequest";

const groupService = {
  getRooms: () => httpRequest.get("/rooms"),
};
export default groupService;
