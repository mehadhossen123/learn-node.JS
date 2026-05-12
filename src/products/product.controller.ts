import type { IncomingMessage, ServerResponse } from "node:http";
import { getProduct, postProduct } from "../service/product.service";
import type { Iproduct } from "../types/type.product";
import { parseBody } from "../utility/parseBody";

// import products from '../database/db.json'

export const productController = async(
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  // console.log("actual request: ",req)
  const method = req.method;
  const partsUrl = url?.split("/");
  const id =
    partsUrl && partsUrl[1] === "products" ? Number(partsUrl[2]) : null;
 

  if (url === "/products" && method === "GET") {
    const products = getProduct();
    // console.log(products)

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "this is product route", data: products }),
    );
    //  akhane hocce single product get kora 
  } else if (method === "GET" && id !== null) {
    const products = getProduct();
    const product = products.find((p: Iproduct) => p.id == id);
    if(!product){
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "product not found ",
          data:null,
        }),
      );
    }
    // console.log("single product: ", product);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ message: "this is product route", data: product }),
    );
  } 
  
//   create data --mane data post kora using post man . 
  else if (method === "POST" && url === "/products") {
    const body=await parseBody(req)
    // console.log("this is body",body);
    const  newProduct={
      id:Date.now(),
      ...body
    }
    const products = getProduct();
    products.push(newProduct);
    console.log("products",products)
  

postProduct(products)


    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ 
        message: "product create successfully",
        data:newProduct
        }),
    );
  }
  // akhane data put korbo mane data update or edit korbo 
   else if (method==='PUT' && id!==null){
    const body = await parseBody(req);
    const products = getProduct();
    const index=products.findIndex((p:Iproduct)=>p.id==id)
  
    if(index<0){
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "product not found",
          data:null,
        }),
      );

    }
    // console.log(products[index])
     products[index]={
     id: products[index].id,
      ...body
     }
     postProduct(products)
     res.writeHead(200, { "content-type": "application/json" });
     res.end(
       JSON.stringify({
         message: "product create successfully",
         data: products[index],
       }),
     );

   }

   else if  (method==='DELETE' && id!==null){
    const products = getProduct();
    const index = products.findIndex((p: Iproduct) => p.id == id);
    if (index < 0) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "product not found",
          data: null,
        }),
      );
    }
    products.splice(index,1);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "product deleted successfully",
        data:null,
      }),
    );
    postProduct(products)
    

   }
};
