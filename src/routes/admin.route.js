import express from 'express'
import { loginController } from '../controllers/admin.controller.js'

const route = express()

route.post('/login', loginController)

export default route
