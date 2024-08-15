import { Subject } from "rxjs";

export enum RealtimeChatEventType {
    conversation,
    joinRoom,
    createRoom,
}

export type RealtimeChatEventArg =
    | {
          type: RealtimeChatEventType.conversation;
          payload: object;
      }
    | {
          type: RealtimeChatEventType.joinRoom;
          payload: object;
      }
    | {
          type: RealtimeChatEventType.createRoom;
          payload: object;
      };

const realtimeChatEvent = new Subject<RealtimeChatEventArg>();
export default realtimeChatEvent;
