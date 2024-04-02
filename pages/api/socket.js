// source: https://github.com/BrandonBartram98/NextJS-SocketIO-Chatroom/blob/main/pages/api/socket.js
import { Server } from 'socket.io'
let activePlayers = []

const socketSetup = async (req, res) => {
    if (res.socket.server.io) {
        console.log('Already set up')
        res.end()
        return
    }

    const httpServer = res.socket.server
    const io = new Server(httpServer, {
        path: '/api/socket_io',
        addTrailingSlash: false,
    })
    res.socket.server.io = io

    io.on('connection', (socket) => {

        console.log("Made socket connection", socket.id);

        socket.on("joined", (id) => {
            if (!activePlayers.includes(id)) {
                activePlayers.push(id);
                // console.log(id)
                io.sockets.emit("addPlayer", activePlayers);
            }
        });

        socket.on("updatePos", (args) => {
            io.sockets.emit("updatePositions", args);
            // console.log(args);
        });

    })

    console.log('Setting up socket')
    res.end()
}

export default socketSetup;