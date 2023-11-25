const express = require('express')

require('dotenv').config()
const app = express()


app.get('/api/chat', (req,res) => {
  console.log("!")
})

app.get('/api/chat/:id', (req,res) => {

})
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
