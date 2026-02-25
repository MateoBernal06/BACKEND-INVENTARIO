import express from 'express'
import { login } from '../controllers/admin.controller.js'

const route = express()

route.post('/login', login)

export default route
