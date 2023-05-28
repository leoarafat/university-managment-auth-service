import express, { Application } from "express";
// import cors from "cors";
export const app:Application = express();
export const port = process.env.PORT || 8000;


app.use(express.json())
// app.use(cors())


app.get('/', (req, res)=>{
    res.send('hello world Vai')
})


