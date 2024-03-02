import createApp from './app'
import UserModel from './routes/users/model/User'
import IdeaModel from './routes/work/ideas/model/Idea'
import AnwswerModel from './routes/study/answers/model/Answer'
import ConceptModel from './routes/study/concepts/model/Concept'
import QuestionModel from './routes/study/questions/model/Question'
import KnowledgeModel from './routes/study/knowledge/model/Knowledge'
import ReasearchModel from './routes/study/researchs/model/Research'
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
const ideaPool = createPoolConnection()

const userModel = new UserModel({ userPool })
const researchModel = new ReasearchModel({ researchPool })
const knowledgeModel = new KnowledgeModel({ knowledgePool })
const conceptModel = new ConceptModel({ conceptPool: knowledgePool })
const questionModel = new QuestionModel({ questionPool: researchPool })
const answerModel = new AnwswerModel({ answerPool: researchPool })
const ideaModel = new IdeaModel({ ideaPool })

const app = createApp({ 
    pingPool, 
    userModel, 
    ideaModel,
    answerModel,
    questionModel,
    knowledgeModel, 
    researchModel, 
    conceptModel, 
})

const server = app.listen(PORT[ENVIRONMENT], () => {
    console.log(`Server running on Port: ${PORT[ENVIRONMENT]}`)
})

export { app, server, userPool, researchPool, knowledgePool, ideaPool }