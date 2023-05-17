const mongoose=require('mongoose')
const dotenv =require('dotenv')

dotenv.config()

const userName= process.env.MONGO_USERNAME
const password=process.env.MONGO_PASSWORD

const database=`mongodb+srv://${userName}:${password}@cluster0.ehnr8c4.mongodb.net/`

 async function connectDB(){
    try {
        await mongoose.connect(database)
        console.log('Connected!')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports=connectDB