const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const authRoutes = require('../auth/authRoutes')
const eventRoutes = require('../routes/eventRoutes')
const shoppingRoutes = require('../routes/shoppingRoutes')
const toDoRoutes = require('../routes/toDoRoutes')

const server =  express()

server.use(cors());
server.use(helmet());

server.use(express.json());
server.use('/api/auth', authRoutes)
server.use('/api/events', eventRoutes)
server.use('/api/shopping', shoppingRoutes)
server.use('/api/todo', toDoRoutes)

server.get('/', ( req, res ) =>{
    res.status(200).json({message: "Welcome to Celebratr's API !"})
})

server.use("/docs", express.static("./docs"));

// server.use(express.static(path.join(__dirname, "public")));

module.exports = server