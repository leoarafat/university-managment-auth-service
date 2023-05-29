import express, { Application, Request, Response } from 'express'
import cors from 'cors'
export const app: Application = express()
//cors
app.use(cors())
//Hello world

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('hello world Vai')
})
