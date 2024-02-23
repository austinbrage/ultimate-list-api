import createApp from './app'
import UserModel from './models/User'
import { PORT, ENVIRONMENT } from './utils/config'
import { createPoolConnection } from './services/database'

const userPool = createPoolConnection()

const userModel = new UserModel({ userPool })

const app = createApp({ userModel })

const server = app.listen(PORT[ENVIRONMENT], () => {
    console.log(`Server running on Port: ${PORT[ENVIRONMENT]}`)
})

export { app, server, userPool }