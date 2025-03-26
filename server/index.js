"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" }
});
io.on("connection", (socket) => {

    socket.on("user_ready", (data) => {
  
    });
    socket.on("message", (data) => {

        io.emit("chats", data);
    });
    socket.on("user joined", (username) => {

        socket.broadcast.emit("chats", { chat: `${username} joined the chat`, user: "System" });
    });
    socket.off("dissconneted", (username) => {

        socket.broadcast.emit("chats", { chat: `${username} left the chat`, user: "System" });
    });
});
server.listen(3001, "0.0.0.0", () => {

});
