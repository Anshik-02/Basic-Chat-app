import { Socket } from "socket.io";

const { Server } = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket: any) => {
  socket.on("message", (data: string) => {
    io.emit("chats", data);
  });

  socket.on("user joined", (username: string) => {
    socket.broadcast.emit("chats", {
      chat: `${username} joined the chat`,
      user: "System",
    });
  });


});

server.listen(3001, "0.0.0.0", () => {});
