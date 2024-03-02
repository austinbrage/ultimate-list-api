import { Router } from "express"
import { QUESTION as Q } from "../../apiRoutes"
import { Questions as QuestionController } from "./controller/Questions"
import createAuthorization from "../../../auth/authorization"
import type { IQuestion } from "./types/questions"

const createQuestionRouter = ({ questionModel }: { questionModel: IQuestion }) => {
    const questionRouter = Router()

    const userAuth = createAuthorization()
    const questionController = new QuestionController({ questionModel })

    questionRouter.get(Q.DATA,          userAuth, questionController.getAll)

    questionRouter.patch(Q.DESCRIPTION, userAuth, questionController.changeDescription)
    questionRouter.patch(Q.PRIORITY,    userAuth, questionController.changePriority)
    questionRouter.patch(Q.NAME,        userAuth, questionController.changeName)

    questionRouter.post(Q.DATA,         userAuth, questionController.addNew)
    
    questionRouter.delete(Q.DATA,       userAuth, questionController.remove)

    return questionRouter
}

export default createQuestionRouter