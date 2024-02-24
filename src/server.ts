import createApp from './app'
import UserModel from './models/User'
import KnowledgeModel from './models/Knowledge'
import { PORT, ENVIRONMENT } from './utils/config'
import { createPoolConnection } from './services/database'

const pingPool = createPoolConnection({
    waitForConnection: true, 
    connectionLimit: 1, 
    queueLimit: 0
})

const userPool = createPoolConnection()
const knowledgePool = createPoolConnection()

const userModel = new UserModel({ userPool })
const knowledgeModel = new KnowledgeModel({ knowledgePool })

const app = createApp({ userModel, knowledgeModel, pingPool })

const server = app.listen(PORT[ENVIRONMENT], () => {
    console.log(`Server running on Port: ${PORT[ENVIRONMENT]}`)
})

export { app, server, userPool, knowledgePool }