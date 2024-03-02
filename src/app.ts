import express, { json, Router } from 'express'
import createUserRouter from './routes/users/users'
import createIdeaRouter from './routes/ideas/ideas'
import createAnswerRouter from './routes/study/answers/answers'
import createQuestionRouter from './routes/study/questions/questions'
import createConceptRouter from './routes/study/concepts/concepts'
import createResearchRouter from './routes/study/researchs/researchs'
import createKnowledgeRouter from './routes/study/knowledge/knowledge'
import createHealthcareRouter from './routes/healthcare/healthcare'
import corsMiddleware from './middlewares/cors'
import errorMiddleware from './middlewares/error'
import { notFoundHandler } from './services/notFoundHandler'
import { APP, RESOURCES } from './routes/apiRoutes'
import { type IKnowledge } from './routes/study/knowledge/types/knowledge' 
import { type IResearch } from './routes/study/researchs/types/researchs' 
import { type IQuestion } from './routes/study/questions/types/questions'
import { type IConcept } from './routes/study/concepts/types/concepts'
import { type IAnswer } from './routes/study/answers/types/answers'
import { type IIdea } from './routes/ideas/types/ideas'
import { type IUser } from './routes/users/types/users'
import { type Pool } from 'mysql2/promise'

type ModelsType = {
    knowledgeModel: IKnowledge
    researchModel: IResearch
    questionModel: IQuestion
    conceptModel: IConcept
    answerModel: IAnswer
    ideaModel: IIdea
    userModel: IUser
    pingPool: Pool
}

const createApp = ({ 
    userModel, 
    ideaModel,
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
    mainRouter.use(RESOURCES.IDEA,          createIdeaRouter({ ideaModel }))
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