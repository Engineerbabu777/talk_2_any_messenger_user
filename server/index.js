const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const chatRoutes = require('./routes/chatRoutes')
const messageRoutes = require('./routes/messageRoutes')
const bodyParser = require('body-parser')
const cors = require('cors')
const { errorHandler, notFound } = require('./middleware/errorMiddleware')
require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

app.use(notFound)
app.use(errorHandler)

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DATABASE CONNECTED!'))
  .catch(err => console.log('DATABASE ERROR!', err.message))

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})

// CREATING IO SERVER!
const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000'
  }
})

// ON CONNECTION !!
io.on('connection', socket => {
  console.log('A user connected!')

  socket.on('setup', userData => {
    console.log(userData._id)
    socket.join(userData._id)
    socket.emit('connected')
  })

  socket.on('join chat', room => {
    socket.join(room)
    console.log('user joined room: ', room)
  })


  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'))

  socket.on('new message', newMessageReceived => {
    var chat = newMessageReceived.chat

    if (!chat?.users) return console.log('users is not defined!')

    chat.users.forEach(user => {
      if (newMessageReceived.sender._id === user._id) return

      socket.in(user._id).emit('message received', newMessageReceived)
    })
  })
})
