import { Router } from "express"
import { KNOWLEDGE as K } from "../../apiRoutes"
import { Knowledge as KnowledgeController } from "./controller/Knowledge"
import createAuthorization from "../../../auth/authorization"
import type { IKnowledge } from "./types/knowledge"

const createKnowledgeRouter = ({ knowledgeModel }: { knowledgeModel: IKnowledge }) => {
    const knowledgeRouter = Router()

    const userAuth = createAuthorization()
    const knowledgeController = new KnowledgeController({ knowledgeModel })

    knowledgeRouter.get(K.DATA,          userAuth, knowledgeController.getAll)

    knowledgeRouter.patch(K.DESCRIPTION, userAuth, knowledgeController.changeDescription)
    knowledgeRouter.patch(K.PRIORITY,    userAuth, knowledgeController.changePriority)
    knowledgeRouter.patch(K.TYPE,        userAuth, knowledgeController.changeType)
    knowledgeRouter.patch(K.NAME,        userAuth, knowledgeController.changeName)

    knowledgeRouter.post(K.DATA,         userAuth, knowledgeController.addNew)
    
    knowledgeRouter.delete(K.DATA,       userAuth, knowledgeController.remove)

    return knowledgeRouter
}

export default createKnowledgeRouter