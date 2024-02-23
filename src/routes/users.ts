import { Router } from 'express'
import { Users as UserController } from '../controllers/Users'
import createAuthorization from '../auth/authorization'
import { type IUser } from '../types/users'

const createUserRouter = ({ userModel }: { userModel: IUser }) => {
    const userRouter = Router()

    const userAuth = createAuthorization()
    const userController = new UserController({ userModel })
    
    userRouter.get('/data',       userAuth, userController.getAll)
    
    userRouter.patch('/name',     userAuth, userController.changeName)
    userRouter.patch('/email',    userAuth, userController.changeEmail)
    userRouter.patch('/nickname', userAuth, userController.changeNickname)
    userRouter.patch('/password', userAuth, userController.changePassword)
    
    userRouter.post('/register',  userController.addNew)
    userRouter.post('/login',     userController.getPassword)
    userRouter.post('/oauth',     userController.openAuth)
    userRouter.post('/key',       userController.getId)

    userRouter.delete('/data',    userAuth, userController.remove)

    return userRouter
}

export default createUserRouter