import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import multer from 'multer'
import userRouter from './routers/user.router'
import registerRouter from './routers/register.router'
import touristRouter from './routers/tourist.router'
import ownerRouter from './routers/owner.router'
import adminRouter from './routers/admin.router'


const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/projekat')
const conn = mongoose.connection
conn.once('open', ()=>{
    console.log("DB ok")
})

const router = express.Router()

app.use('/users', userRouter)
app.use('/register', registerRouter)
app.use('/tourist', touristRouter)
app.use('/owner', ownerRouter)
app.use('/admin', adminRouter)

app.use('/uploads', express.static('uploads'));
app.use('/gallery', express.static('gallery'));

app.get('/', (req,res)=> {res.send("Hello world!")})
app.listen(4000, ()=>console.log('Express running on port 4000'))
