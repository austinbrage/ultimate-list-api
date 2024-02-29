import { Router } from 'express'
import { USER as U } from '../apiRoutes'
import { Users as UserController } from './controller/Users'
import createAuthorization from '../../auth/authorization'
import { type IUser } from './types/users'

const createUserRouter = ({ userModel }: { userModel: IUser }) => {
    const userRouter = Router()

    const userAuth = createAuthorization()
    const userController = new UserController({ userModel })
    
    userRouter.get(U.DATA,       userAuth, userController.getAll)
    
    userRouter.patch(U.NAME,     userAuth, userController.changeName)
    userRouter.patch(U.EMAIL,    userAuth, userController.changeEmail)
    userRouter.patch(U.NICKNAME, userAuth, userController.changeNickname)
    userRouter.patch(U.PASSWORD, userAuth, userController.changePassword)
    
    userRouter.post(U.REGISTER,  userController.addNew)
    userRouter.post(U.LOGIN,     userController.getPassword)
    userRouter.post(U.OAUTH,     userController.openAuth)
    userRouter.post(U.KEY,       userController.getId)

    userRouter.delete(U.DATA,    userAuth, userController.remove)

    return userRouter
}

export default createUserRouter