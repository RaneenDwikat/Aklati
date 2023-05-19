const express=require('express')
const morgan=require('morgan')
const cors = require('cors')
const connectDB= require('./utills/mongo/connectDB')
const dotenv =require('dotenv')
const userRouter = require("./router/userRouter")
const adminRouter = require("./router/adminRouter")
const itemRouter = require("./router/itemRouter")
const favoriteRouter = require("./router/favoriteRouter")
const orderRouter = require("./router/orderRouter")

dotenv.config()

connectDB()

const app=express()

if(process.env.NODE_ENV==="development"){
    app.use(morgan("dev"))
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(userRouter)
app.use(adminRouter)
app.use(itemRouter)
app.use(favoriteRouter)
app.use(orderRouter)

const port= process.env.PORT || 3000

app.listen(port,console.log(`server running on port = ${port}`))