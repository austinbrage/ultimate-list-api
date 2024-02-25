import express, { json } from 'express'
import createUserRouter from './routes/users'
import createConceptRouter from './routes/concepts'
import createKnowledgeRouter from './routes/knowledge'
import createHealthcareRouter from './routes/healthcare'
import corsMiddleware from './middlewares/cors'
import errorMiddleware from './middlewares/error'
import { notFoundHandler } from './services/notFoundHandler'
import { type IKnowledge } from './types/knowledge' 
import { type IConcept } from './types/concepts'
import { type IUser } from './types/users'
import { type Pool } from 'mysql2/promise'

type ModelsType = {
    knowledgeModel: IKnowledge
    conceptModel: IConcept
    userModel: IUser
    pingPool: Pool
}

const createApp = ({ userModel, knowledgeModel, conceptModel, pingPool }: ModelsType) => {
    const app = express()

    app.use(json())
    app.use(corsMiddleware())
    app.disable('x-powered-by')
    
    app.use('/ultimate-list/ping',          createHealthcareRouter({ pingPool }))
    app.use('/ultimate-list/user',          createUserRouter({ userModel }))
    app.use('/ultimate-list/knowledge',     createKnowledgeRouter({ knowledgeModel }))
    app.use('/ultimate-list/concept',       createConceptRouter({ conceptModel }))
    
    app.all('*', notFoundHandler)
    app.use(errorMiddleware)

    return app
}

export default createApp