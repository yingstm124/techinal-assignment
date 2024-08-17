export interface IChatParam {
  message: string;
}
export interface IChatHistory {
  message: string;
  timeStamp: string;
}

export interface IOnlineUsers {
  [userName: string]: string;
}
