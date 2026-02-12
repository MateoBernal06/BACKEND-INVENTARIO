import express from 'express'
import { registrerUser, loginUser } from '../controllers/admin.controller.js'

const route = express()

route.post('/register', registrerUser)
route.post('/login', loginUser)

export default route
