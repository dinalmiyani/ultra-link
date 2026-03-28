"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/socket";
import { useAppStore } from "@/lib/store";
import type { User } from "@/types";

export function usePresence(page: string) {
  const { currentUser, setPresentUsers } = useAppStore();

  useEffect(() => {
    if (!currentUser) return;
    const socket = getSocket();
    if (!socket.connected) socket.connect();

    socket.emit("presence:join", {
      id: currentUser.id,
      name: currentUser.name,
      color: currentUser.color,
      page,
    });

    socket.on("presence:update", (users: Omit<User, "email">[]) => {
      const others = users.filter((u) => u.id !== currentUser.id);
      setPresentUsers(others as User[]);
    });

    return () => {
      socket.off("presence:update");
      socket.emit("presence:move", "away");
      setPresentUsers([]);
    };
  }, [page, currentUser]);
}