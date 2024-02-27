import { Router } from "express"
import { ANSWER as A } from "../types/allRoutes"
import { Answers as AnswerController } from "../controllers/Answers"
import createAuthorization from "../auth/authorization"
import type { IAnswer } from "../types/answers"

const createAnswerRouter = ({ answerModel }: { answerModel: IAnswer }) => {
    const answerRouter = Router()

    const userAuth = createAuthorization()
    const answerController = new AnswerController({ answerModel })

    answerRouter.get(A.DATA,          userAuth, answerController.getAll)

    answerRouter.patch(A.DESCRIPTION, userAuth, answerController.changeDescription)
    answerRouter.patch(A.PRIORITY,    userAuth, answerController.changePriority)
    answerRouter.patch(A.TYPE,        userAuth, answerController.changeType)
    answerRouter.patch(A.NAME,        userAuth, answerController.changeName)

    answerRouter.post(A.DATA,         userAuth, answerController.addNew)
    
    answerRouter.delete(A.DATA,       userAuth, answerController.remove)

    return answerRouter
}

export default createAnswerRouter