import type { IncomingMessage, ServerResponse } from "node:http";
import { getProduct } from "../service/product.service";
import type { Iproduct } from "../../types/type.product";
// import products from '../database/db.json'

export const productController=(req:IncomingMessage,res:ServerResponse)=>{
    const url=req.url;
    const method=req.method;
    const partsUrl=url?.split("/")
    const id=partsUrl && partsUrl[1]==='products'? Number(partsUrl[2]):null;
    console.log("this is the actual id ",id);
    
    if(url==='/products' && method==='GET'){
        
       const products= getProduct()
        // console.log(products)
        
         res.writeHead(200, { "content-type": "application/json" });
         res.end(JSON.stringify({ message: "this is product route",data:products }));
    }
    else if(method==='GET' && id!==null){
         const products= getProduct()
        const product=products.find((p: Iproduct)=>p.id==id);
        console.log("single product: ",product)
         res.writeHead(200, { "content-type": "application/json" });
         res.end(
           JSON.stringify({ message: "this is product route", data:product }),
         );
    }

}