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
    console.log(`User connected with id ${socket.id}`);
})

const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

