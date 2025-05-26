import { io } from 'socket.io-client';

const SOCKET_BASE_URL = process.env.REACT_APP_SOCKET_URL;

const socketAuth = io(`${SOCKET_BASE_URL}/auth`, {
    reconnection: false
});

const socketChat = io(`${SOCKET_BASE_URL}/chat`)

export const socketConnections = {socketAuth: socketAuth, socketChat: socketChat}