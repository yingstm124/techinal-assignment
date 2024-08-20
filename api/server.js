const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
  connectTimeout: 3000,
});

const SALT_ROUND = 8;

const mockUsers = [
  {
    userName: "alice",
    name: "alice",
    password: bcrypt.hashSync("123", SALT_ROUND),
  },
  {
    userName: "john",
    name: "john",
    password: bcrypt.hashSync("123", SALT_ROUND),
  },
  {
    userName: "hong",
    name: "hong",
    password: bcrypt.hashSync("123", SALT_ROUND),
  },
];

let userRooms = [];
let onlineUsers = {};

const createRoom = (participants, roomName, type, createdBy) => {
  const isDuplicateRoomName = userRooms.find((i) => i.roomName === roomName);
  if (isDuplicateRoomName) return undefined;
  const newUserRoom = {
    participants: [...participants],
    messages: [],
    roomName: roomName,
    type: type,
    createdBy: createdBy,
  };
  userRooms = [...userRooms, newUserRoom];
  return newUserRoom;
};

const joinRoom = (userName, senderName) => {
  let existingUserRoom = null;

  existingUserRoom = userRooms.find(
    (f) =>
      f.participants.includes(userName) && f.participants.includes(senderName)
  );

  if (existingUserRoom) {
    return existingUserRoom.roomName;
  }

  const newUserRoom = createRoom(
    [userName, senderName],
    `${userName}-${senderName}-room`,
    "individual",
    userName
  );

  return newUserRoom.roomName;
};

const addMessage = (roomName, userName, content) => {
  const myRoom = userRooms.find((i) => i.roomName === roomName);
  if (!myRoom) return;

  const newMessage = {
    content: content,
    type: "text",
    timeStamp: Date.now(),
    userName: userName,
    status: "sent"
  };
  myRoom.messages = [...myRoom.messages, newMessage];
  return newMessage;
};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("user-online", async (userName) => {
    console.log(`${userName} online`);
    socket.userName = userName;
    onlineUsers[userName] = socket.id;
    io.emit("online-users", onlineUsers);
  });

  //   socket.on("user-offline", () => {
  //     const existingUser = Object.keys(onlineUsers).find(
  //       (i) => i === socket.userName
  //     );
  //     if (existingUser) {
  //       delete onlineUsers[existingUser];
  //       io.emit("online-users", onlineUsers);
  //     }
  //   });

  socket.on("online-groups", () => {
    const existingGroups = userRooms
      .filter((i) => i.type === "group")
      .map((i) => ({
        roomName: i.roomName,
        createdBy: i.createdBy,
      }));
    if (existingGroups.length > 0) io.emit("update-groups", existingGroups);
  });

  socket.on("join-room", ({ userName, room }) => {
    socket.join(room);

    socket.to(room).emit("user-connected", {
      userName: "System",
      message: `${userName} connected`,
    });

    socket.on("chat-message", ({ userName, message }, callback) => {
      console.log(`${userName} message ${message} in ${room}`);
      const newMessage = addMessage(room, userName, message);
      io.to(room).emit("chat-message", newMessage);
      callback({
        status: "ok"
      })
    });

    // socket.on("disconnect", (reason) => {
    //   console.log(`User ${socket.id} disconnected due to: ${reason}`);
    //   delete onlineUsers[socket.id];
    //   console.log("disconnect updated onlineUsers", onlineUsers);
    //   io.emit("online-users", onlineUsers);
    // });
  });

  socket.on("disconnect-room", ({ userName, roomName }) => {
    io.to(roomName).emit("user-disconnected", {
      userName: "System",
      message: `${userName} disconnected`,
    });
  });

  socket.on("disconnect", (reason) => {
    console.log(`User ${socket.userName} disconnected due to: ${reason}`);
    const isOnlineUser = onlineUsers[socket.userName];
    if (!isOnlineUser) return;
    delete onlineUsers[socket.userName];
    console.log("disconnect updated onlineUsers", onlineUsers);
    io.emit("online-users", onlineUsers);
  });
  socket.on("reconnect", (attemptNumber) => {
    console.log(
      `User ${socket.userName} reconnected after ${attemptNumber} attempts`
    );
    onlineUsers[socket.userName] = socket.userName;
    io.emit("online-users", onlineUsers);
  });
});

app.get("/", (_, res) => {
  res.send("Hi server");
});

//Auth service
app.post("/login", (req, res) => {
  const { userName, password } = req.body;
  const user = mockUsers.find((user) => user.userName === userName);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: "Incorrect password." });
  }

  const token = jwt.sign(
    { username: user.username, name: user.name },
    "your_secret_key"
  );
  res.send(token);
});

// User service
app.get("/users", (_, res) => {
  const users = mockUsers.map((i) => ({ userName: i.userName, name: i.name }));
  res.send(users);
});

// Group service
app.post("/group/:roomName/:userName", (req, res) => {
  const roomName = req.params.roomName;
  const userName = req.params.userName;
  const newUserRoom = createRoom([], roomName, "group", userName);
  if (newUserRoom)
    res.send(
      JSON.stringify({
        roomName: newUserRoom.roomName,
        createdBy: newUserRoom.createdBy,
      })
    );
  else return res.status(400).json({ message: "No room" });
});
app.delete("/group/:roomName/:userName", (req, res) => {
  const roomName = req.params.roomName;
  const userName = req.params.userName;

  const deleteRoom = userRooms.find((i) => i.roomName === roomName);
  if (!deleteRoom) return res.status(400).json({ message: "Not found room" });

  const isOwnGroup = deleteRoom.createdBy === userName;
  if (!isOwnGroup)
    return res.status(400).json({ message: "Not allow delete room" });

  userRooms = userRooms.filter((i) => i.roomName !== roomName);
  res.send(userRooms);
});

// Chat service
app.get("/chat-history/:roomName", (req, res) => {
  const roomName = req.params.roomName;
  const chatHistory = userRooms.find((i) => i.roomName === roomName).messages;
  res.send(JSON.stringify(chatHistory));
});

app.post("/init-room/:userName/:senderName", (req, res) => {
  const userName = req.params.userName;
  const senderName = req.params.senderName;
  const roomName = joinRoom(userName, senderName);
  res.send(JSON.stringify(roomName));
});

server.listen(port, () => {
  console.log(`app listening port http://localhost:${port}`);
});
