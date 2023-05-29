import express, { Application } from 'express'
import cors from 'cors'
import usersRouter from './app/modules/users/users.routes'

export const app: Application = express()
//cors
app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/users', usersRouter)
