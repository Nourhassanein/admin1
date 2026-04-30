import { useState } from "react";

export default function AIChat({ open, setOpen }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I'm OpticAI. How can I help?" }
  ]);
  const [input, setInput] = useState("");

  const getReply = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("product"))
      return "Go to Products → Add Product.";

    if (msg.includes("order"))
      return "Orders are in the Orders page.";

    if (msg.includes("error") || msg.includes("blank"))
      return "Check console (F12).";

    if (msg.includes("dark"))
      return "Use the theme toggle.";

    return "Try asking about products, orders, or errors.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    const botMsg = { from: "bot", text: getReply(input) };

    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput("");
  };

  return (
    <>
      {}
      <div className="ai-float-btn" onClick={() => setOpen(!open)}>
        🤖
      </div>

      {}
      {open && (
        <div className="ai-chat">
          <div className="ai-header">
            OpticAI
          </div>

          <div className="ai-messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`ai-message ${m.from === "user" ? "user" : "bot"}`}
              >
                <span className="ai-bubble">{m.text}</span>
              </div>
            ))}
          </div>

          <div className="ai-input">
            <input
              className="form-control"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="btn btn-primary" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}