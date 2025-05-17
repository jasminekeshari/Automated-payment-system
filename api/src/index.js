// api/src/index.js
import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import http from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

// now MONGODB_URI is loaded
mongoose.connect(process.env.MONGODB_URI);

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());

server.listen(4000, () => console.log("API + WS on :4000"));