import {createUserController} from '../controllers/user.controller.js';
import express from 'express'
import {verifyUser} from '../middleware/token.js'

const route = express()

route.post('/user', verifyUser, createUserController)

export default route