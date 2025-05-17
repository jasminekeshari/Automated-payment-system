import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import dayjs from 'dayjs';

const socket = io('http://localhost:5000');

export default function ChatApp() {
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [toId, setToId] = useState(null);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (role && userId) {
      socket.emit('register', { userId });
      // Load chat history
      axios.get(`http://localhost:5000/api/chat/${userId}/${toId}`).then(res => {
        setChat(res.data);
      });
    }
  }, [role, userId, toId]);

  useEffect(() => {
    socket.on('receive_message', (msg) => {
      setChat((prev) => [...prev, msg]);
    });
    return () => socket.off('receive_message');
  }, []);

  const handleLogin = (role) => {
    if (role === 'admin') {
      setRole('admin');
      setUserId('admin1');
      setToId('mentor1');
    } else {
      setRole('mentor');
      setUserId('mentor1');
      setToId('admin1');
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      const msg = {
        fromId: userId,
        fromRole: role,
        toId,
        text: message
      };
      socket.emit('send_message', msg);
      setChat((prev) => [...prev, { ...msg, timestamp: new Date() }]);
      setMessage('');
    }
  };

  const exportChat = async () => {
    const res = await axios.get(`http://localhost:5000/api/chat/export/${userId}/${toId}`, { responseType: 'blob' });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `chat-${userId}-${toId}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  if (!role) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <button onClick={() => handleLogin('admin')} className="px-4 py-2 bg-blue-600 text-white rounded">Login as Admin</button>
        <button onClick={() => handleLogin('mentor')} className="px-4 py-2 bg-green-600 text-white rounded">Login as Mentor</button>
      </div>
    );
  }

  const groupByDate = chat.reduce((acc, msg) => {
    const date = dayjs(msg.timestamp).format('YYYY-MM-DD');
    acc[date] = acc[date] || [];
    acc[date].push(msg);
    return acc;
  }, {});

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Chat as {role}</h2>
      <button onClick={exportChat} className="mb-2 px-2 py-1 text-sm bg-gray-500 text-white rounded">Export Chat</button>
      <div className="h-64 overflow-y-auto border p-2 mb-4">
        {Object.entries(groupByDate).map(([date, messages]) => (
          <div key={date}>
            <div className="text-center text-xs text-gray-500 my-2">{date}</div>
            {messages.map((msg, i) => (
              <div key={i} className={`mb-2 ${msg.fromRole === role ? 'text-right' : 'text-left'}`}>
                <p className="text-sm">
                  <strong>{msg.fromRole}</strong>: {msg.text}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 border p-2 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="px-4 py-2 bg-blue-500 text-white rounded">Send</button>
      </div>
    </div>
  );
}
