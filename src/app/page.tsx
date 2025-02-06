"use client";

import { useState, useEffect } from "react";
import { Box, Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";

export default function Home() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [lastCommand, setLastCommand] = useState("None");
  const serverUrl = "https://ws-pokemon.onrender.com/ws";

  useEffect(() => {
    const socket = new WebSocket(serverUrl);
    setWs(socket);

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendCommand = (command: string) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ action: command }));
      setLastCommand(command);
    }
  };

  return (
    <Box asChild p="2">
      <main>
        <Heading>Twitch Plays Pokémon</Heading>
        <Text>
          Last command: <span>{lastCommand}</span>
        </Text>
        <Flex gap="2">
          <Grid columns="3" gap="2">
            <Box />
            <Button onClick={() => sendCommand("UP")}>UP</Button>
            <Box />
            <Button onClick={() => sendCommand("LEFT")}>LEFT</Button>
            <Box />
            <Button onClick={() => sendCommand("RIGHT")}>RIGHT</Button>
            <Box />
            <Button onClick={() => sendCommand("DOWN")}>DOWN</Button>
          </Grid>
          <Flex gap="2" direction="column">
            <Flex gap="2">
              <Button onClick={() => sendCommand("A")}>A</Button>
              <Button onClick={() => sendCommand("B")}>B</Button>
            </Flex>
            <Button onClick={() => sendCommand("START")}>START</Button>
          </Flex>
        </Flex>
      </main>
    </Box>
  );
}
