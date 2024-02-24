import { Server } from 'socket.io'

export default async (req, res) => {
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
        socket.on('send-message', (obj) => {
            io.emit('receive-message', obj)
        })
        socket.on('retrieve-users', (obj) => {
            io.emit('retrieve-user', obj)
        })
    })

    console.log('Setting up socket')
    res.end()
}