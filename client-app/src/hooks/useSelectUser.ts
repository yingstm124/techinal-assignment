import { useCallback, useEffect, useState } from "react";
import userService from "../service/user.service";
import { userContract } from "../service/contract/user.contract";

function useSelectUser() {
  const [users, setUsers] = useState<userContract[]>([]);
  const getUsers = useCallback(async () => {
    const response = await userService.getUsers();
    if (!response.data) return;
    setUsers(response.data);
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return {
    users,
  };
}
export default useSelectUser;
