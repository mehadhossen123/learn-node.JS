import path from "node:path"
import fs from 'fs'

const filePath=path.join(process.cwd(),'./src/database/db.json')
export const getProduct=()=>{
    const data=fs.readFileSync(filePath,'utf-8')
    return JSON.parse(data)
}

export const postProduct =(product:any)=>{
    fs.writeFileSync(filePath,JSON.stringify(product))
}