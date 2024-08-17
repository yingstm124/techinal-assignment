const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

app.use(
  cors({
    origins: "http://localhost:3000", // Replace with your React app's URL
    // methods: ['GET', 'POST'],
    // allowedHeaders: ['Content-Type'],
    // credentials: true, // Allow cookies or other credentials to be included in requests
  })
);
app.use(bodyParser.json());

const io = new Server(server, {
  cors: {
    origins: "http://localhost:3000",
  },
});

let userRooms = [];
let onlineUsers = {};

const joinRoom = (userName, senderName) => {
  let existingUserRoom = null;

  existingUserRoom = userRooms.find(
    (f) =>
      f.participants.includes(userName) && f.participants.includes(senderName)
  );

  if (existingUserRoom) {
    return existingUserRoom.roomName;
  }

  const newUserRoom = {
    participants: [userName, senderName],
    messages: [],
    roomName: `${userName}-${senderName}-room`,
    type: "individual",
  };

  userRooms = [...userRooms, newUserRoom];
  console.log("join room -> userRooms", userRooms);

  return newUserRoom.roomName;
};

const addMessage = (roomName, userName, content) => {
  console.log("userRooms : userRooms", userRooms);
  const myRoom = userRooms.find((i) => i.roomName === roomName);
  console.log("addMessage : myRoom", myRoom);
  if (!myRoom) return;

  const newMessage = {
    content: content,
    type: "text",
    timeStamp: Date.now,
    userName: userName,
  };
  myRoom.messages = [...myRoom.messages, newMessage];
  return newMessage;
};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("user-online", async (userName) => {
    socket.userName = userName;
    onlineUsers[userName] = socket.id;
    io.emit("online-users", onlineUsers);
    console.log(`${userName} is online!!`);
  });

  socket.on("user-offline", () => {
    const existingUser = Object.keys(onlineUsers).find(
      (i) => i === socket.userName
    );
    if (existingUser) {
      delete onlineUsers[existingUser];
      io.emit("online-users", onlineUsers);
    }
    console.log(`${socket.userName} is offline`);
  });

  socket.on("join-room", ({ userName, room }) => {
    console.log(`${userName} join ${room}`);
    socket.join(room);

    socket.to(room).emit("user-connected", {
      userName: "System",
      message: `user ${userName} connected`,
    });

    socket.on("chat-message", ({ userName, message }) => {
      console.log(`${userName} message ${message} in ${room}`);
      const newMessage = addMessage(room, userName, message);
      io.to(room).emit("chat-message", newMessage);
    });

    socket.on("disconnect", ({ userName }) => {
      console.log(`${userName} disconnected`);
      io.to(room).emit("user-disconnect", {
        userName: "System",
        message: `user ${userName} disconnected`,
      });
    });
  });
});

app.get("/", (_, res) => {
  res.send("Hi server");
});

app.get("/chat-history/:roomName", (req, res) => {
  const roomName = req.params.roomName;
  const chatHistory = userRooms.find((i) => i.roomName === roomName).messages;
  console.log(`get chat history ${roomName}`, chatHistory);
  res.send(JSON.stringify(chatHistory));
});

app.get("/rooms", (req, res) => {
  const groupRooms = userRooms
    .filter((i) => i.type !== "individual")
    .map((i) => ({
      roomName: i.roomName,
    }));
  res.send(JSON.stringify(groupRooms));
});

app.post("/init-room/:userName/:senderName", (req, res) => {
  const userName = req.params.userName;
  const senderName = req.params.senderName;
  const roomName = joinRoom(userName, senderName);
  console.log(`${userName} chat with ${senderName} in ${roomName} `);
  res.send(JSON.stringify(roomName));
});

server.listen(port, () => {
  console.log(`app listening port http://localhost:${port}`);
});
