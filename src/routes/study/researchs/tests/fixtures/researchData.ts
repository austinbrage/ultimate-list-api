import { APP, RESOURCES, type RESEARCH } from "../../../../apiRoutes"
import { type ResearchTypes } from "../../types/researchs"

type ResearchRoutes = (route: RESEARCH) => string

type researchMock = {
    newData1: Omit<ResearchTypes['data'], "user_id">
    newData2: Omit<ResearchTypes['data'], "user_id">
    changedData: Omit<ResearchTypes['fullData'], "user_id">
    name: (researchId: number) => ResearchTypes['idName']
    type: (researchId: number) => ResearchTypes['idType']
    priority: (researchId: number) => ResearchTypes['idPriority']
    description: (researchId: number) => ResearchTypes['idDescription']
    id: (researchId: number) => ResearchTypes['id']
}

export const researchRoutes: ResearchRoutes = (route) => {
    return `${APP.VERSION_1}${RESOURCES.RESEARCH}${route}`
}

export const researchMock: researchMock = {
    newData1: {
        type: 'Backend',
        name: 'Express framework',
        description: 'Lorem ipsum'
    },
    newData2: {
        type: 'Frontend',
        name: 'Remix framework',
        description: 'Lorem ipsum'
    },
    changedData: {
        priority: 3,
        type: 'Deployment',
        name: 'Docker',
        description: 'App containerization'
    },
    name: (researchId: number) => ({
        id: researchId,
        name: 'Docker'
    }),
    type: (researchId: number) => ({
        id: researchId,
        type: 'Deployment'
    }),
    priority: (researchId: number) => ({
        id: researchId,
        priority: 3
    }),
    description: (researchId: number) => ({
        id: researchId,
        description: 'App containerization'
    }),
    id: (researchId: number) => ({
        id: researchId
    })
}