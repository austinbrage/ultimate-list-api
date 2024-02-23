import express, { json } from 'express'
import createUserRouter from './routes/users'
import corsMiddleware from './middlewares/cors'
import errorMiddleware from './middlewares/error'
import { type IUser } from './types/users'
import { notFoundHandler } from './services/notFoundHandler'

type ModelsType = {
    userModel: IUser
}

const createApp = ({ userModel }: ModelsType) => {
    const app = express()

    app.use(json())
    app.use(corsMiddleware())
    app.disable('x-powered-by')
    
    app.use('/ultimate-list/user',    createUserRouter({ userModel }))
    
    app.all('*', notFoundHandler)
    app.use(errorMiddleware)

    return app
}

export default createApp