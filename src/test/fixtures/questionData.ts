import { APP, RESOURCES, type QUESTION } from "../../types/allRoutes"
import { type QuestionTypes } from "../../types/questions"

type QuestionRoutes = (route: QUESTION) => string

type QuestionMock = {
    newData: (researchId: number) => QuestionTypes['fullData']
    changedData: (researchId: number) => QuestionTypes['fullData']
    name: (doubtId: number) => QuestionTypes['idName']
    priority: (doubtId: number) => QuestionTypes['idPriority']
    description: (doubtId: number) => QuestionTypes['idDescription']
    id: (doubtId: number) => QuestionTypes['id']
    researchId: (researchId: number) => QuestionTypes['researchIdQuery']
}

export const questionRoutes: QuestionRoutes = (route) => {
    return `${APP.VERSION_1}${RESOURCES.QUESTION}${route}`
}

export const questionMock: QuestionMock = {
    newData: (researchId) => ({
        priority: 1,
        research_id: researchId,
        name: 'How to validate data on Express?',
        description: 'Lorem ipsum'
    }),
    changedData: (researchId) => ({
        priority: 2,
        research_id: researchId,
        name: 'How to build a docker image?',
        description: 'Get into different steps with the as operator'
    }),
    name: (doubtId: number) => ({
        id: doubtId,
        name: 'How to build a docker image?'
    }),
    priority: (doubtId: number) => ({
        id: doubtId,
        priority: 2
    }),
    description: (doubtId: number) => ({
        id: doubtId,
        description: 'Get into different steps with the as operator'
    }),
    id: (doubtId: number) => ({
        id: doubtId
    }),
    researchId: (researchId: number) => ({
        research_id: researchId.toString()
    })
}