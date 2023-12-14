import React, { useEffect, useRef, useState } from "react";
import SimplePeer from "simple-peer";
import io from "socket.io-client";

const VideoChat = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const [peer, setPeer] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
        // Handle error
      }
    };
    getMedia();

    const newSocket = io("http://localhost:5000"); // Replace with your server URL
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("signal", (data) => {
        if (!peer && data.type === "offer") {
          const newPeer = new SimplePeer({
            initiator: false,
            stream: localStream,
          });

          newPeer.on("signal", (signalData) => {
            socket.emit("signal", signalData);
          });

          newPeer.on("stream", (stream) => {
            setRemoteStream(stream);
            if (remoteVideoRef.current) {
              remoteVideoRef.current.srcObject = stream;
            }
          });

          newPeer.signal(data);
          setPeer(newPeer);
        }
      });

      socket.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }
  }, [socket, peer, localStream]);

  const connectToPeer = () => {
    if (socket && !peer) {
      const newPeer = new SimplePeer({ initiator: true, stream: localStream });

      newPeer.on("signal", (data) => {
        socket.emit("signal", data);
      });

      newPeer.on("stream", (stream) => {
        setRemoteStream(stream);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = stream;
        }
      });

      setPeer(newPeer);
    }
  };

  const sendMessage = () => {
    if (socket) {
      socket.emit("message", messageInput);
      setMessages((prevMessages) => [...prevMessages, messageInput]);
      setMessageInput("");
    }
  };

  return (
    <div>
      <div>
        <video
          ref={localVideoRef}
          autoPlay
          playsInline
          width="300"
          height="200"
          muted // Mute the local video to avoid feedback
        />
      </div>
      <div>
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          width="300"
          height="200"
        />
      </div>
      <button onClick={connectToPeer}>Connect to Remote</button>

      <div>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>

      <div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default VideoChat;
