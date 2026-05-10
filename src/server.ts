import { createServer, IncomingMessage, Server } from "http";
import { routeHandler } from "./routes/route";

// Here i have to create a server . this is my first typeScript server 
const server:Server=createServer((req:IncomingMessage,res)=>{
    // console.log(req)
    routeHandler(req,res)
})

server.listen(5000,()=>{
    console.log(`the server is running on prot 5000`)
})