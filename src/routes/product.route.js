import {createProductController, productsListController, getProductController, deleteProductController} from '../controllers/product.controller.js'
import express from 'express'
import {verifyToken} from '../middleware/token.js'
import upload from '../config/multer.js'

const route = express()

route.post("/products/:categories_id", verifyToken, upload.single("imagen"), createProductController);
route.get("/products", verifyToken, productsListController)
route.get("/products/:id", verifyToken, getProductController)
route.delete("/products/:id", verifyToken, deleteProductController)

export default route