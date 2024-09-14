import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.on("beginPath", (arg) => {
        socket.broadcast.emit("beginPath", arg);
    });

    socket.on("drawLine", (arg) => {
        socket.broadcast.emit("drawLine", arg);
    });

    socket.on("changeConfig", (arg)=>{
        socket.broadcast.emit("changeConfig", arg);
    })
})

const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

