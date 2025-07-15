import React, { useState, useEffect, useRef } from "react";
import { BsEmojiSmile, BsSend, BsPaperclip, BsMic } from "react-icons/bs";

const initialMessages = [
  {
    id: 1,
    text: "How can we help? We’re here for you! 😄",
    sender: "me",
    time: "10:00 AM",
    avatar: "/public/assets/img/avatar-2.png",
  },
  {
    id: 2,
    text: "Hey John, I am looking for the best admin template. Could you please help me to find it out? 🤔",
    sender: "other",
    time: "",
    avatar: "/public/assets/img/avatar-1.png",
  },
];

const ChatScreen = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: input.trim(),
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      avatar: "/public/assets/img/avatar-2.png",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-wrapper container-fluid p-0 d-flex flex-column">
      {/* Header */}
      <div className="chat-header d-flex align-items-center p-3 border-bottom">
        <img
          src="/public/assets/img/avatar-2.png"
          alt="Avatar"
          className="rounded-circle me-2"
          width="40"
        />
        <div>
          <div className="fw-semibold text-white">Anonymous Frog</div>
          {/* <small className="text-muted">NextJS developer</small> */}
        </div>
      </div>

      {/* Chat Body */}
      <div className="chat-body flex-grow-1 p-3 overflow-auto d-flex flex-column">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`d-flex mb-3 ${
              msg.sender === "me"
                ? "justify-content-end"
                : "justify-content-start"
            }`}
          >
            {msg.sender === "other" && (
              <img
                src={msg.avatar}
                alt="avatar"
                className="rounded-circle me-2"
                width="35"
              />
            )}

            <div className={`chat-bubble ${msg.sender}`}>
              <div>{msg.text}</div>
              {msg.time && (
                <small className="text-muted d-block mt-1 text-end">
                  {msg.time}
                </small>
              )}
            </div>

            {msg.sender === "me" && (
              <img
                src={msg.avatar}
                alt="avatar"
                className="rounded-circle ms-2"
                width="35"
              />
            )}
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

      {/* Input */}
      <form
        className="chat-input d-flex align-items-center p-3 border-top"
        onSubmit={sendMessage}
      >
        <input
          className="form-control me-2 bg-dark border-0 text-white"
          placeholder="Type your message here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <BsEmojiSmile className="text-muted me-2 fs-5" />
        <BsMic className="text-muted me-2 fs-5" />
        <BsPaperclip className="text-muted me-2 fs-5" />
        <button
          className="btn btn-primary d-flex align-items-center gap-1"
          type="submit"
        >
          Send <BsSend />
        </button>
      </form>
    </div>
  );
};

export default ChatScreen;
