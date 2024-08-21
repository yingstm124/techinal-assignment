## Technical Note

The application is designed to support real-time communication by using Socket.io between users and server, with features like individual ang group chats, online/offline user status including alert disconnect/reconnect server.

### Socket event

| Event | Description |
| ----  | ----------|
| connection | Triggered when a user first connects after logging in. |
| disconnect | Triggered when a user disconnects, including during logout. |
| reconnect | Triggered when the server comes back online |
| user-online | Updates the list of online users when someone log in or out. |
| online-group | list of group that users have created.|
| update-group | push new online group.|
| join-room | Used for joining a group chat and individual chat.|
| chat-message | push message to save message history in the chat room.|
| disconnect-room | push which users are connected a chat room.|