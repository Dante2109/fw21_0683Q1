const express=require("express");
const cors=require("cors")
const { numberRouter } = require("./Routes/numberRoutes");
const server=express();
server.use(cors())


server.use("/numbers",numberRouter)

server.listen(8008,()=>{
    console.log("Server is running at 8008")
})