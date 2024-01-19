const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const { addUser, getUser, getUsers, removeUser } = require('./src/users')

app.use(cors())
app.use(express.static('../chat-app/dist'))

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: [],
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    addUser(socket.id, username, room)
    socket.join(room)
    io.in(room).emit('updateUsers', getUsers())
  })

  socket.on('sendMessage', ({ username, message, room }) => {
    console.log({ username, message })
    const msg = {
      id: socket.id,
      username,
      message
    }
    io.in(room).emit('updateConversation', msg)
  })

  socket.on('disconnect', () => {
    removeUser(socket.id)
    io.emit('updateUsers', getUsers())
  })
})

const port = process.env.PORT || 3001

server.listen(port, () => {
  console.log(`Server running in port ${port}`)
})
