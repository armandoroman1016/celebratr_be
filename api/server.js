const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const authRoutes = require('../auth/authRoutes')

const server =  express()

server.use(express.json())
server.use(helmet())
server.use(cors())
server.use('/api/auth', authRoutes)

server.get('/', ( req, res ) =>{
    res.status(200).json({message: 'Hello !'})
})

module.exports = server