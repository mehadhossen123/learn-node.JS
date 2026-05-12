
import type { IncomingMessage } from "node:http";

export const parseBody=(req:IncomingMessage):Promise<any>=>{
    return new Promise ((resolve,reject)=>{
        let body=''
        // akhane request er data gula chunk by chunk ase body te joma hocce 
        req.on('data',(chunk)=>{
            body=body+chunk;
        })
        // akhane trigger end hocce 
         req.on("end", () => {
           try {
             resolve(JSON.parse(body));
           } catch (error) {
             reject(error);
           }
         });
        
    })
   
   
    

}