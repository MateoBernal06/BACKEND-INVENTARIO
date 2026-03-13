import express from 'express'
import morgan from 'morgan'
import cors from "cors";
import 'colors'
import 'dotenv/config'
import admin from './routes/admin.route.js'
import category from './routes/category.route.js'
import user from './routes/user.route.js'
import product from './routes/product.route.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(
  cors({
    origin: ["http://localhost:5173", 
            "https://tu-frontend.vercel.app"],
  }),
);
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res)=>{
    res.send('Server OK')
})

app.use('/api/v1', admin)
app.use('/api/v1', category)
app.use('/api/v1', user)
app.use('/api/v1', product)

app.use((req, res, next)=>{
    res.status(404).json({
        ok: false,
        msg: 'Error 404 Not Found'
    })
    next()
})

// Para Vercel, exportar la app en lugar de hacer listen
export default app

// Solo para desarrollo local
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, ()=>{
        console.log(`Server on port ${PORT}`.bgGreen)
    })
}