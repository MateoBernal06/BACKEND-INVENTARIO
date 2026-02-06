import express from 'express'
import { registrer } from '../controllers/admin.controller.js'

const route = express()

route.post('/register', registrer)

export default route
