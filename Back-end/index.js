const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const { Server } = require('socket.io');
const Chat = require('./models/chat.model');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

const users = new Map();

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('register', ({ userId }) => {
    users.set(userId, socket.id);
    console.log(`User registered: ${userId}`);
  });

  socket.on('send_message', async (msg) => {
    const { toId } = msg;
    const toSocket = users.get(toId);

    // Save to DB
    const savedMsg = new Chat(msg);
    await savedMsg.save();

    // Send to recipient
    if (toSocket) {
      io.to(toSocket).emit('receive_message', { ...msg, timestamp: new Date() });
    }
  });

  socket.on('disconnect', () => {
    for (const [key, value] of users.entries()) {
      if (value === socket.id) users.delete(key);
    }
    console.log('A user disconnected');
  });
});

// Test route
app.get('/', (req, res) => {
  res.send('Socket.IO Chat Server Running');
});

// MongoDB connect + server start
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
    server.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));
