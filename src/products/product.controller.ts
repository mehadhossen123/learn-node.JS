import type { IncomingMessage, ServerResponse } from "node:http";
import { getProduct } from "../service/product.service";
// import products from '../database/db.json'

export const productController=(req:IncomingMessage,res:ServerResponse)=>{
    const url=req.url;
    const method=req.method;
    if(url==='/products' && method==='GET'){
        // const products = [
        //   {
        //     id: "1",
        //     name: "product -1",
        //     price: "400 tk ",
        //   },
        // ];
       const products= getProduct()
        // console.log(products)
        
         res.writeHead(200, { "content-type": "application/json" });
         res.end(JSON.stringify({ message: "this is product route",data:products }));
    }

}