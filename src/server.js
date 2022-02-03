import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import helloService from './services/helloService'
import errorHandler from './handlers/errorHandler'
import authHandler from './handlers/authHandler'
import asyncHandler from './handlers/asyncHandler'

const server = express()
server.use(express.json())
server.use(express.urlencoded({ extended: true }))


server.post('/helloWord', authHandler, asyncHandler(async (req, res) => {
    res.send(await helloService.hello(req.body))
}))

server.use(errorHandler)

export default server
