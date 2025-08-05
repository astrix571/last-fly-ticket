import React, { useState } from 'react';

function ChatBox() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Welcome to Last Fly Ticket AI 🛫' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: updatedMessages,
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message;

      if (reply) {
        setMessages((prev) => [...prev, reply]);
      }
    } catch (err) {
      console.error('Error communicating with GPT:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-md p-4 mt-8">
      <div className="h-96 overflow-y-auto space-y-3 border p-2 rounded">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded ${
              msg.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-100 text-left'
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border px-4 py-2 rounded-l"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBox;
