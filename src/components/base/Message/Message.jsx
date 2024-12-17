"use client";
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaExclamationCircle } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { TbInfoTriangleFilled } from "react-icons/tb";

const MessageTypes = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
};

const Message = ({ content, type }) => {
  const baseClasses =
    "px-4 py-2 rounded-md shadow-lg flex items-center mb-2 animate-fade-down";
  const typeClasses = {
    [MessageTypes.SUCCESS]:
      "bg-white border-l-4 border-green-500 text-green-700",
    [MessageTypes.ERROR]: "bg-white border-l-4 border-red-500 text-red-700",
    [MessageTypes.INFO]: "bg-white border-l-4 border-blue-500 text-blue-700",
    [MessageTypes.WARNING]:
      "bg-white border-l-4 border-yellow-500 text-yellow-700",
  };

  const icons = {
    [MessageTypes.SUCCESS]: <FaRegCircleCheck className="mr-2" />,
    [MessageTypes.ERROR]: <FaExclamationCircle className="mr-2" />,
    [MessageTypes.INFO]: <FaInfoCircle className="mr-2" />,
    [MessageTypes.WARNING]: <TbInfoTriangleFilled className="mr-2" />,
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      {icons[type]}
      {content}
    </div>
  );
};

const MessageContainer = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    window.addMessage = (message) => {
      const isDuplicate = messages.some(
        (msg) => msg.content === message.content && msg.type === message.type
      );

      if (!isDuplicate) {
        setMessages((prevMessages) => [...prevMessages, message]);

        setTimeout(() => {
          setMessages((prevMessages) =>
            prevMessages.filter((msg) => msg !== message)
          );
        }, message.duration || 3000);
      }
    };

    return () => {
      window.addMessage = undefined;
    };
  }, [messages]);

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      {messages.map((msg, index) => (
        <Message key={index} {...msg} />
      ))}
    </div>
  );
};

const messageService = {
  show: (content, type = MessageTypes.INFO, duration = 3000) => {
    const message = { content, type, duration };
    let container = document.getElementById("message-container");

    if (!container) {
      container = document.createElement("div");
      container.id = "message-container";
      document.body.appendChild(container);

      const root = createRoot(container);
      root.render(<MessageContainer />);

      return new Promise((resolve) => {
        const checkAddMessage = () => {
          if (typeof window.addMessage === "function") {
            window.addMessage(message);
            resolve();
          } else {
            setTimeout(checkAddMessage, 10);
          }
        };
        checkAddMessage();
      });
    }

    if (typeof window.addMessage === "function") {
      window.addMessage(message);
    } else {
      console.error("addMessage function is not available.");
    }
  },
  success: (content, duration) =>
    messageService.show(content, MessageTypes.SUCCESS, duration),
  error: (content, duration) =>
    messageService.show(content, MessageTypes.ERROR, duration),
  info: (content, duration) =>
    messageService.show(content, MessageTypes.INFO, duration),
  warning: (content, duration) =>
    messageService.show(content, MessageTypes.WARNING, duration),
};

export default messageService;
