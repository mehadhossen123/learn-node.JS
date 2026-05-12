import type { IncomingMessage, ServerResponse } from "node:http";
import { getProduct } from "../service/product.service";
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
    console.log("new product :",newProduct)




    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({ 
        message: "product create successfully",
        }),
    );
  }
};
