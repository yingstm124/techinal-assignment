const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const { timeStamp } = require("console");

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

const io = new Server(server, {
    cors: {
        origins: "http://localhost:3000",
    },
});

let users = {};
let chatHistory = {};

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("start chat", (userId) => {
        console.log("start chat", userId);
        socket.id = userId;
        chatHistory[socket.id] = [];
    });

    socket.on("chat message", ({ message }) => {
        console.log(`user ${socket.id} chat`, message);
        if (chatHistory[socket.id]) {
            chatHistory[socket.id] = [
                ...chatHistory[socket.id],
                { message: message, timeStamp: Date.now() },
            ];
        }
        console.log("chat history", chatHistory);
        io.emit("chat message", { message: message });
    });

    socket.on("disconnect", () => {
        const user = users[socket.id];
        if (user) {
            delete users[socket.id];
        }
        console.log("user disconnected");
    });
});

app.get("/", (req, res) => {
    res.send("Hello server!");
});

server.listen(port, () => {
    console.log(`app listening port http://localhost:${port}`);
});
