import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

function App() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [typing, setTyping] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('chat message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    newSocket.on('typing', (username) => {
      setTyping(`${username} が入力中...`);
    });

    newSocket.on('stop typing', () => {
      setTyping('');
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      socket.emit('chat message', messageInput);
      setMessageInput('');
    }
  };

  const handleTyping = () => {
    socket.emit('typing', 'Someone');
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      socket.emit('stop typing');
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {typing && <div className="typing">{typing}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          onInput={handleTyping}
          placeholder="メッセージを入力..."
          autoComplete="off"
        />
        <button className="button" type="submit">
          送信
        </button>
      </form>
    </div>
  );
}

export default App; 