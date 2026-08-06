import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import Message from "./Message";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.log(error);
        return;
      }

      setTimeout(() => {
        setMessages(data || []);
      }, 0);
    };

    getMessages();

    const channel = supabase
      .channel("messages-channel")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendMessage = async () => {
  if (!username.trim() || !message.trim()) {
    alert("Please enter name and message");
    return;
  }

  const { data, error } = await supabase
    .from("messages")
    .insert([
      {
        username: username,
        message: message,
      },
    ])
    .select();

  console.log("Inserted Data:", data);
  console.log("Insert Error:", error);

  if (error) {
    alert(error.message);
    return;
  }

  setMessage("");
};

  return (
    <div className="chat">
      <h1>Realtime Chat</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendMessage}>Send</button>

      <hr />

      {messages.map((msg) => (
        <Message key={msg.id} msg={msg} />
      ))}
    </div>
  );
}

export default Chat;