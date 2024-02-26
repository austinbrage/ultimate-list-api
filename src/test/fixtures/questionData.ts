import { APP, RESOURCES, type QUESTION } from "../../types/allRoutes"
import { type QuestionTypes } from "../../types/questions"

type QuestionRoutes = (route: QUESTION) => string

type QuestionMock = {
    newData1: (researchId: number) => QuestionTypes['data']
    newData2: (researchId: number) => QuestionTypes['data']
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
    newData1: (researchId) => ({
        research_id: researchId,
        name: 'How to validate data on Express?',
        description: 'Lorem ipsum'
    }),
    newData2: (researchId) => ({
        research_id: researchId,
        name: 'How to make routes on Express?',
        description: 'Lorem ipsum'
    }),
    changedData: (researchId) => ({
        priority: 3,
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
        priority: 3
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