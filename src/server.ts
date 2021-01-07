import * as express from 'express'
import * as http from 'http'
import { Socket } from 'socket.io'
import { Server } from 'http'
import { Application, Request, Response } from 'express'

const app: Application = express()
const server: Server = http.createServer(app)
const ws: Socket = require('socket.io')(server)

const rooms: Array<string> = []

app.use(express.static(__dirname))

app.get('*', (req: Request, res: Response) => {
    res.sendFile(__dirname + '/index.html')
})

ws.on('connection', (socket: Socket) => {

    // Creating new room
    socket.on('createRoom', (roomId: string) => {
        
        // Checking if current room exist
        if (!rooms.includes(roomId)) 
            rooms.push(roomId)
        else return false

        // Adding user to new room
        socket.join(roomId)
    })

    // Connection to room
    socket.on('connectToRoom', (roomId: string) => {

        // Checking if room exist
        if (!rooms.includes(roomId)) return false

        // Adding user to room
        socket.join(roomId)
    })

    // Update game table
    socket.on('updateTable', (table: Array<any>, player:string, roomId: string) => {
        socket.to(roomId).emit('newTable', table, player)
    })

    // Change game state to tie
    socket.on('hasTie', (roomId: string) => {
        socket.to(roomId).emit('tie')
    })

    // Change game state to win
    socket.on('hasWinner', (winner: string, roomId: string) => {
        socket.to(roomId).emit('win', winner)
    })

    // Change game state to play
    socket.on('hasPlay', (player: string, roomId: string) => {
        socket.to(roomId).emit('restart', player)
    })
})

server.listen(3000, ()=> {
    console.log('Server is up!')
})