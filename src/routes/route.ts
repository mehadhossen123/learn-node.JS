import type { IncomingMessage, ServerResponse } from "node:http";
import { productController } from "../products/product.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  const url = req.url;
  const method = req.method;
  if (url === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(JSON.stringify({ message: "hello world " }));
  } else if (url?.startsWith("/products")) {
   productController(req,res)
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end(JSON.stringify({ message: "url not found" }));
  }
};
