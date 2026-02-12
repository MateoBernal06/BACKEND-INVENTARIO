import { viewCategories, createCategories, updateCategories, deleteCategories } from "../controllers/category.controller.js";
import {verifyUser} from '../middleware/token.js'
import express from 'express'

const route = express()

route.get('/categories', verifyUser, viewCategories)
route.post('/categories', verifyUser, createCategories)
route.put('/categories/:code', verifyUser, updateCategories)
route.delete('/categories/:code', verifyUser, deleteCategories)

export default route