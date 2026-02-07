import { viewCategories } from "../controllers/category.controller.js";
import {verifyUser} from '../middleware/token.js'
import express from 'express'

const route = express()

route.get('/categories', verifyUser, viewCategories)

export default route