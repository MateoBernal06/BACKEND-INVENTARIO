import express from 'express'
import morgan from 'morgan'
import 'colors'
import 'dotenv/config'
import admin from './routes/admin.route.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res)=>{
    res.send('Server OK')
})

app.use('/api/v1', admin)

app.use((req, res, next)=>{
    res.status(404).json({
        ok: false,
        msg: 'Error 404 Not Found'
    })
    next()
})

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`.bgGreen)
})