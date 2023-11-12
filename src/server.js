import DB_CONNECTION from "./db/index.js"
import dotenv from "dotenv"
import app from "./app.js"

dotenv.config({
    path : './env'
})

DB_CONNECTION()
.then(()=>{

    app.on("error",(error)=>{
        console.log("ERROR",error);
        throw error
    })

    const port = process.env.PORT || 8000
    app.listen(port , () => {
        console.log(`App is listening at port : ${port}`);
    })
})
.catch((err) => {
    console.log("Mongo Connection Failed !!",err);
})



