import { Router } from "express"
import { RESEARCH as R } from "../types/allRoutes"
import { Researchs as ResearchController } from "../controllers/Researchs"
import createAuthorization from "../auth/authorization"
import type { IResearch } from "../types/researchs"

const createResearchRouter = ({ researchModel }: { researchModel: IResearch }) => {
    const researchRouter = Router()

    const userAuth = createAuthorization()
    const researchController = new ResearchController({ researchModel })

    researchRouter.get(R.DATA,          userAuth, researchController.getAll)

    researchRouter.patch(R.DESCRIPTION, userAuth, researchController.changeDescription)
    researchRouter.patch(R.PRIORITY,    userAuth, researchController.changePriority)
    researchRouter.patch(R.TYPE,        userAuth, researchController.changeType)
    researchRouter.patch(R.NAME,        userAuth, researchController.changeName)

    researchRouter.post(R.DATA,         userAuth, researchController.addNew)
    
    researchRouter.delete(R.DATA,       userAuth, researchController.remove)

    return researchRouter
}

export default createResearchRouter