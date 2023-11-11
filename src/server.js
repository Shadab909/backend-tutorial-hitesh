import DB_CONNECTION from "./db/index.js"
import dotenv from "dotenv"

dotenv.config({
    path : './env'
})

DB_CONNECTION()
.then(()=>{

})
.catch((err) => {
    
})



