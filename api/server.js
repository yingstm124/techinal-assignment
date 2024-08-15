const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");

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

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("setUsername", (username) => {
        console.log(`received ${username}`);
        socket.username = username;
    });

    socket.on("conversation", (obj) => {
        console.log("coversation ", obj);
        io.emit(
            "conversation",
            JSON.stringify({ ...obj, sender: socket.username })
        );
    });
});

app.get("/", (req, res) => {
    res.send("Hello server!");
});

server.listen(port, () => {
    console.log(`app listening port http://localhost:${port}`);
});
