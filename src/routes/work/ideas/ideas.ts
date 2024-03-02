import { Router } from "express"
import { IDEA as I } from "../../apiRoutes"
import { Ideas as IdeaController } from "./controller/Ideas"
import createAuthorization from "../../../auth/authorization"
import type { IIdea } from "./types/ideas"

const createIdeaRouter = ({ ideaModel }: { ideaModel: IIdea }) => {
    const ideaRouter = Router()

    const userAuth = createAuthorization()
    const ideaController = new IdeaController({ ideaModel })

    ideaRouter.get(I.DATA,          userAuth, ideaController.getAll)

    ideaRouter.patch(I.SOLVEDPROBLEM, userAuth, ideaController.changeSolvedProblem)
    ideaRouter.patch(I.DESCRIPTION, userAuth, ideaController.changeDescription)
    ideaRouter.patch(I.PRIORITY,    userAuth, ideaController.changePriority)
    ideaRouter.patch(I.TYPE,        userAuth, ideaController.changeType)
    ideaRouter.patch(I.NAME,        userAuth, ideaController.changeName)

    ideaRouter.post(I.DATA,         userAuth, ideaController.addNew)
    
    ideaRouter.delete(I.DATA,       userAuth, ideaController.remove)

    return ideaRouter
}

export default createIdeaRouter