import express, { json, Router } from 'express'
import createUserRouter from './routes/users'
import createAnswerRouter from './routes/answers'
import createQuestionRouter from './routes/questions'
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
import { type IQuestion } from './types/questions'
import { type IConcept } from './types/concepts'
import { type IAnswer } from './types/answers'
import { type IUser } from './types/users'
import { type Pool } from 'mysql2/promise'

type ModelsType = {
    knowledgeModel: IKnowledge
    researchModel: IResearch
    questionModel: IQuestion
    conceptModel: IConcept
    answerModel: IAnswer
    userModel: IUser
    pingPool: Pool
}

const createApp = ({ 
    userModel, 
    knowledgeModel, 
    researchModel, 
    questionModel, 
    conceptModel, 
    answerModel,
    pingPool 
}: ModelsType) => {
    const app = express()
    const mainRouter = Router()

    app.use(json())
    app.use(corsMiddleware())
    app.disable('x-powered-by')
    
    mainRouter.use(RESOURCES.PING,          createHealthcareRouter({ pingPool }))
    mainRouter.use(RESOURCES.USER,          createUserRouter({ userModel }))
    mainRouter.use(RESOURCES.KNOWLEDGE,     createKnowledgeRouter({ knowledgeModel }))
    mainRouter.use(RESOURCES.CONCEPT,       createConceptRouter({ conceptModel }))
    mainRouter.use(RESOURCES.RESEARCH,      createResearchRouter({ researchModel }))
    mainRouter.use(RESOURCES.QUESTION,      createQuestionRouter({ questionModel }))
    mainRouter.use(RESOURCES.ANSWER,        createAnswerRouter({ answerModel }))
    
    app.use(APP.VERSION_1, mainRouter)

    app.all('*', notFoundHandler)
    app.use(errorMiddleware)

    return app
}

export default createApp