import { APP, RESOURCES, type IDEA } from "../../../apiRoutes"
import { type IdeaTypes } from "../../types/ideas"

type IdeaRoutes = (route: IDEA) => string

type IdeaMock = {
    newData1: Omit<IdeaTypes['data'], "user_id">
    newData2: Omit<IdeaTypes['data'], "user_id">
    changedData: Omit<IdeaTypes['fullData'], "user_id">
    name: (ideaId: number) => IdeaTypes['idName']
    type: (ideaId: number) => IdeaTypes['idType']
    priority: (ideaId: number) => IdeaTypes['idPriority']
    description: (ideaId: number) => IdeaTypes['idDescription']
    solvedProblem: (ideaId: number) => IdeaTypes['idSolvedProblem']
    id: (ideaId: number) => IdeaTypes['id']
}

export const ideaRoutes: IdeaRoutes = (route) => {
    return `${APP.VERSION_1}${RESOURCES.IDEA}${route}`
}

export const ideaMock: IdeaMock = {
    newData1: {
        type: 'Application',
        name: 'Ultimate List App',
        description: 'Lorem ipsum',
        solved_problem: 'Management of ideas'
    },
    newData2: {
        type: 'Blog Post',
        name: 'How to use Cloud Providers correctly',
        description: 'Lorem ipsum',
        solved_problem: 'High payments on cloud bills'
    },
    changedData: {
        priority: 3,
        type: 'API',
        name: 'Ultimate List API',
        description: 'Api for ultimate list DB',
        solved_problem: 'Interface for ultimate list DB'
    },
    name: (ideaId) => ({
        id: ideaId,
        name: 'Ultimate List API'
    }),
    type: (ideaId) => ({
        id: ideaId,
        type: 'API'
    }),
    priority: (ideaId) => ({
        id: ideaId,
        priority: 3
    }),
    description: (ideaId) => ({
        id: ideaId,
        description: 'Api for ultimate list DB'
    }),
    solvedProblem: (ideaId) => ({
        id: ideaId,
        solved_problem: 'Interface for ultimate list DB'
    }),
    id: (ideaId) => ({
        id: ideaId
    })
}