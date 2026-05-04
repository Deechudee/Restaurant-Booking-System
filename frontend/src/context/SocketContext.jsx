import { createContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

// eslint-disable-next-line react-refresh/only-export-components
export const SocketContext = createContext(null);

const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // ✅ Provide a function instead of direct ref
  const getSocket = () => socketRef.current;

  return (
    <SocketContext.Provider value={getSocket}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;