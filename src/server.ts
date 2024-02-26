import createApp from './app'
import UserModel from './models/User'
import QuestionModel from './models/Question'
import KnowledgeModel from './models/Knowledge'
import ConceptModel from './models/Concept'
import ReasearchModel from './models/Research'
import { PORT, ENVIRONMENT } from './utils/config'
import { createPoolConnection } from './services/database'

const pingPool = createPoolConnection({
    waitForConnection: true, 
    connectionLimit: 1, 
    queueLimit: 0
})

const userPool = createPoolConnection()
const researchPool = createPoolConnection()
const knowledgePool = createPoolConnection()

const userModel = new UserModel({ userPool })
const researchModel = new ReasearchModel({ researchPool })
const knowledgeModel = new KnowledgeModel({ knowledgePool })
const conceptModel = new ConceptModel({ conceptPool: knowledgePool })
const questionModel = new QuestionModel({ questionPool: researchPool })

const app = createApp({ 
    pingPool, 
    userModel, 
    questionModel,
    knowledgeModel, 
    researchModel, 
    conceptModel, 
})

const server = app.listen(PORT[ENVIRONMENT], () => {
    console.log(`Server running on Port: ${PORT[ENVIRONMENT]}`)
})

export { app, server, userPool, researchPool, knowledgePool }