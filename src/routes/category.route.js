import { viewCategories, createCategories, updateCategories, deleteCategories, inactivateCategories } from "../controllers/category.controller.js";
import {verifyUser} from '../middleware/token.js'
import express from 'express'

const route = express()

route.get('/categories', verifyUser, viewCategories)
route.post('/categories', verifyUser, createCategories)
route.put('/categories/:id', verifyUser, updateCategories)
route.patch('/categories/:id', verifyUser, inactivateCategories)
route.delete('/categories/:id', verifyUser, deleteCategories)

export default route