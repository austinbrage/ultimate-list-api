import { Router } from "express"
import { Knowledge as KnowledgeController } from "../controllers/Knowledge"
import createAuthorization from "../auth/authorization"
import type { IKnowledge } from "../types/knowledge"

const createKnowledgeRouter = ({ knowledgeModel }: { knowledgeModel: IKnowledge }) => {
    const knowledgeRouter = Router()

    const userAuth = createAuthorization()
    const knowledgeController = new KnowledgeController({ knowledgeModel })

    knowledgeRouter.get('/data',          userAuth, knowledgeController.getAll)

    knowledgeRouter.patch('/description', userAuth, knowledgeController.changeDescription)
    knowledgeRouter.patch('/priority',    userAuth, knowledgeController.changePriority)
    knowledgeRouter.patch('/type',        userAuth, knowledgeController.changeType)
    knowledgeRouter.patch('/name',        userAuth, knowledgeController.changeName)

    knowledgeRouter.post('/data',         userAuth, knowledgeController.addNew)
    
    knowledgeRouter.delete('/data',       userAuth, knowledgeController.remove)

    return knowledgeRouter
}

export default createKnowledgeRouter