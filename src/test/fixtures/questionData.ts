import { APP, RESOURCES, type QUESTION } from "../../types/allRoutes"
import { type QuestionTypes } from "../../types/questions"

type QuestionRoutes = (route: QUESTION) => string

type QuestionMock = {
    newData: (researchId: number) => QuestionTypes['fullData']
    changedData: (researchId: number) => QuestionTypes['fullData']
    name: (questionId: number, researchId: number) => QuestionTypes['idName']
    priority: (questionId: number) => QuestionTypes['idPriority']
    description: (questionId: number) => QuestionTypes['idDescription']
    id: (questionId: number) => QuestionTypes['id']
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
    name: (questionId, researchId) => ({
        research_id: researchId,
        id: questionId,
        name: 'How to build a docker image?'
    }),
    priority: (questionId) => ({
        id: questionId,
        priority: 2
    }),
    description: (questionId) => ({
        id: questionId,
        description: 'Get into different steps with the as operator'
    }),
    id: (questionId) => ({
        id: questionId
    }),
    researchId: (researchId) => ({
        research_id: researchId.toString()
    })
}