import { io, type Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ?? "http://localhost:4000", {
      autoConnect: false,
      reconnection: true,
      reconnectionDelay: 1000,
    });
  }
  return socket;
}

export function disconnectSocket() {
  socket?.disconnect();
  socket = null;
}