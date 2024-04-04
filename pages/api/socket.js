// Source: https://github.com/BrandonBartram98/NextJS-SocketIO-Chatroom/blob/main/pages/api/socket.js

import { Server } from 'socket.io'
let activePlayers = []

const socketSetup = async (req, res) => {
    if (res.socket.server.io) {
        console.log('Already set up socket')
        res.end()
        return

    }

    const httpServer = res.socket.server
    const io = new Server(httpServer, {
        path: '/api/socket',
        addTrailingSlash: false,

    })
    res.socket.server.io = io

    io.on('connection', (socket) => {
        console.log("Made socket connection", socket.id);

        socket.on("joined", (id) => {
            if (!activePlayers.includes(id)) {
                activePlayers.push(id);
                io.sockets.emit("addPlayer", activePlayers);

            }
        });
        socket.on("updatePos", (args) => {
            io.sockets.emit("updatePositions", args);

        });

    })
    res.end()

}

export default socketSetup;