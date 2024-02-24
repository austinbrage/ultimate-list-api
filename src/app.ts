import express, { json } from 'express'
import createUserRouter from './routes/users'
import createHealthcareRouter from './routes/healthcare'
import corsMiddleware from './middlewares/cors'
import errorMiddleware from './middlewares/error'
import { notFoundHandler } from './services/notFoundHandler'
import { type IUser } from './types/users'
import { type Pool } from 'mysql2/promise'

type ModelsType = {
    userModel: IUser
    pingPool: Pool
}

const createApp = ({ userModel, pingPool }: ModelsType) => {
    const app = express()

    app.use(json())
    app.use(corsMiddleware())
    app.disable('x-powered-by')
    
    app.use('/ultimate-list/ping',    createHealthcareRouter({ pingPool }))
    app.use('/ultimate-list/user',    createUserRouter({ userModel }))
    
    app.all('*', notFoundHandler)
    app.use(errorMiddleware)

    return app
}

export default createApp