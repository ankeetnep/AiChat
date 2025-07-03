import React, { useState } from 'react';
import axios from 'axios';

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm ChatGPT, how can I help you today?", sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);
    setInput('');
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...messages.map((msg) => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text,
            })),
            { role: 'user', content: input },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botMessage = {
        text: response.data.choices[0].message.content,
        sender: 'bot',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message ||
        'Kindly text me in media links api billing has expired. Thank you. Your Ankit';
      setMessages((prev) => [...prev, { text: errorMessage, sender: 'bot' }]);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="h-[400px] overflow-y-scroll border rounded-lg p-4 bg-white shadow-md">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 text-white px-4 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;