import express, { json, Router } from 'express'
import createUserRouter from './routes/users'
import createConceptRouter from './routes/concepts'
import createResearchRouter from './routes/researchs'
import createKnowledgeRouter from './routes/knowledge'
import createHealthcareRouter from './routes/healthcare'
import corsMiddleware from './middlewares/cors'
import errorMiddleware from './middlewares/error'
import { notFoundHandler } from './services/notFoundHandler'
import { APP, RESOURCES } from './types/allRoutes'
import { type IKnowledge } from './types/knowledge' 
import { type IResearch } from './types/researchs' 
import { type IConcept } from './types/concepts'
import { type IUser } from './types/users'
import { type Pool } from 'mysql2/promise'

type ModelsType = {
    knowledgeModel: IKnowledge
    researchModel: IResearch
    conceptModel: IConcept
    userModel: IUser
    pingPool: Pool
}

const createApp = ({ userModel, knowledgeModel, researchModel, conceptModel, pingPool }: ModelsType) => {
    const app = express()
    const mainRouter = Router()

    app.use(json())
    app.use(corsMiddleware())
    app.disable('x-powered-by')
    
    mainRouter.use(RESOURCES.PING,          createHealthcareRouter({ pingPool }))
    mainRouter.use(RESOURCES.USER,          createUserRouter({ userModel }))
    mainRouter.use(RESOURCES.CONCEPT,       createConceptRouter({ conceptModel }))
    mainRouter.use(RESOURCES.RESEARCH,      createResearchRouter({ researchModel }))
    mainRouter.use(RESOURCES.KNOWLEDGE,     createKnowledgeRouter({ knowledgeModel }))
    
    app.use(APP.VERSION_1, mainRouter)

    app.all('*', notFoundHandler)
    app.use(errorMiddleware)

    return app
}

export default createApp