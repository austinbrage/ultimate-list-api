import createApp from './app'
import UserModel from './routes/users/model/User'
import AnwswerModel from './routes/answers/model/Answer'
import ConceptModel from './routes/concepts/model/Concept'
import QuestionModel from './routes/questions/model/Question'
import KnowledgeModel from './routes/knowledge/model/Knowledge'
import ReasearchModel from './routes/researchs/model/Research'
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
const answerModel = new AnwswerModel({ answerPool: researchPool })

const app = createApp({ 
    pingPool, 
    userModel, 
    answerModel,
    questionModel,
    knowledgeModel, 
    researchModel, 
    conceptModel, 
})

const server = app.listen(PORT[ENVIRONMENT], () => {
    console.log(`Server running on Port: ${PORT[ENVIRONMENT]}`)
})

export { app, server, userPool, researchPool, knowledgePool }