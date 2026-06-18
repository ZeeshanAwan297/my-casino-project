import { Server } from "socket.io";

let io: any;

export const initSocket = (server: any) => {
  if (!io) {
    io = new Server(server, {
      cors: { origin: "*" },
    });
  }

  return io;
};

export const getIO = () => io;