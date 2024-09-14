"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
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
    socket.on("changeConfig", (arg) => {
        socket.broadcast.emit("changeConfig", arg);
    });
});
const port = process.env.PORT || 8000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
