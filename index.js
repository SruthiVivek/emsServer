// connect env file
require('dotenv').config()

// import router
const router=require('./routes/router')


const express=require('express')
const cors=require('cors')
// import db connection file
require('./dataBase/connections')

const server=express()



server.use(cors())
server.use(express.json())
server.use(router)

const port=4000 || process.env.port 

// export uploads folder to client
server.use('/uploads',express.static('./uploads'))


server.listen(port,()=>{
    console.log(`_________EMS server Started At Port Number ${port} _____________`);
})