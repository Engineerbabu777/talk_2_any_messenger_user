const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const bodyParser = require('body-parser')
const cors = require('cors')
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
require('dotenv').config()
const app = express()

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes)

app.use(notFound);
app.use(errorHandler);


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('DATABASE CONNECTED!'))
  .catch((err) => console.log('DATABASE ERROR!',err.message))

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
