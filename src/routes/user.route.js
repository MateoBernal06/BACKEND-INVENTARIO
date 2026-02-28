import {createUserController, getUsersController, deleteUserController, getUserController, statusUserController} from '../controllers/user.controller.js';
import express from 'express'
import {verifyToken} from '../middleware/token.js'

const route = express()

route.get('/user', verifyToken, getUsersController)
route.get('/user/:id', verifyToken, getUserController)
route.post('/user', verifyToken, createUserController)
route.patch('/user/:id/status', verifyToken, statusUserController)
route.delete('/user/:id', verifyToken, deleteUserController)

export default route