import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express() 

app.use(cors({
    origin : process.env.CORS_ORIGIN, //from where request is coming
    credentials : true
}))

app.use(express.json({limit:"16kb"})) // limits request jason size

app.use(express.urlencoded({extended : true , limit : "16kb"})) // url nesting extended true

app.use(express.static("public")) // configures static file public

app.use(cookieParser()) // allows handling browser cookies

export default app