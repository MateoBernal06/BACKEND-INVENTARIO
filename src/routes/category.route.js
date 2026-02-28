import { viewCategories, createCategories, updateCategories, deleteCategories, inactivateCategories } from "../controllers/category.controller.js";
import {verifyToken} from '../middleware/token.js'
import express from 'express'

const route = express()

route.get('/categories', verifyToken, viewCategories)
route.post('/categories', verifyToken, createCategories)
route.put('/categories/:id', verifyToken, updateCategories)
route.patch('/categories/:id', verifyToken, inactivateCategories)
route.delete('/categories/:id', verifyToken, deleteCategories)

export default route