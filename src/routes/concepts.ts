import { Router } from "express"
import { Concepts as ConceptController } from "../controllers/Concepts"
import createAuthorization from "../auth/authorization"
import type { IConcept } from "../types/concepts"

const createConceptRouter = ({ conceptModel }: { conceptModel: IConcept }) => {
    const conceptRouter = Router()

    const userAuth = createAuthorization()
    const conceptController = new ConceptController({ conceptModel })

    conceptRouter.get('/data',          userAuth, conceptController.getAll)

    conceptRouter.patch('/description', userAuth, conceptController.changeDescription)
    conceptRouter.patch('/priority',    userAuth, conceptController.changePriority)
    conceptRouter.patch('/type',        userAuth, conceptController.changeType)
    conceptRouter.patch('/name',        userAuth, conceptController.changeName)

    conceptRouter.post('/data',         userAuth, conceptController.addNew)
    
    conceptRouter.delete('/data',       userAuth, conceptController.remove)

    return conceptRouter
}

export default createConceptRouter