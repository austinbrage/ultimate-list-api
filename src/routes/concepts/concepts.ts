import { Router } from "express"
import { CONCEPT as C } from "./../apiRoutes"
import { Concepts as ConceptController } from "./controller/Concepts"
import createAuthorization from "../../auth/authorization"
import type { IConcept } from "./types/concepts"

const createConceptRouter = ({ conceptModel }: { conceptModel: IConcept }) => {
    const conceptRouter = Router()

    const userAuth = createAuthorization()
    const conceptController = new ConceptController({ conceptModel })

    conceptRouter.get(C.DATA,          userAuth, conceptController.getAll)

    conceptRouter.patch(C.DESCRIPTION, userAuth, conceptController.changeDescription)
    conceptRouter.patch(C.PRIORITY,    userAuth, conceptController.changePriority)
    conceptRouter.patch(C.TYPE,        userAuth, conceptController.changeType)
    conceptRouter.patch(C.NAME,        userAuth, conceptController.changeName)

    conceptRouter.post(C.DATA,         userAuth, conceptController.addNew)
    
    conceptRouter.delete(C.DATA,       userAuth, conceptController.remove)

    return conceptRouter
}

export default createConceptRouter