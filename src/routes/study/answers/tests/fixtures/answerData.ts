import { APP, RESOURCES, type ANSWER } from "../../../../apiRoutes"
import { type AnswerTypes } from "../../types/answers"

type AnswerRoutes = (route: ANSWER) => string

type AnswerMock = {
    newData1: (questionId: number) => AnswerTypes['data']
    newData2: (questionId: number) => AnswerTypes['data']
    changedData: (questionId: number) => AnswerTypes['fullData']
    name: (answerId: number, questionId: number) => AnswerTypes['idName']
    type: (answerId: number) => AnswerTypes['idType']
    priority: (answerId: number) => AnswerTypes['idPriority']
    description: (answerId: number) => AnswerTypes['idDescription']
    id: (answerId: number) => AnswerTypes['id']
    questionId: (questionId: number) => AnswerTypes['questionIdQuery']
}

export const answerRoutes: AnswerRoutes = (route) => {
    return `${APP.VERSION_1}${RESOURCES.ANSWER}${route}`
}

export const answerMock: AnswerMock = {
    newData1: (questionId) => ({
        question_id: questionId,
        type: 'Fundamental',
        name: 'Validation of data on Express',
        description: 'Lorem ipsum'
    }),
    newData2: (questionId) => ({
        question_id: questionId,
        type: 'Fundamental',
        name: 'Routin on Express',
        description: 'Lorem ipsum'
    }),
    changedData: (questionId) => ({
        priority: 3,
        question_id: questionId,
        type: 'Core',
        name: 'Building images on docker',
        description: 'Get into different steps with the as operator'
    }),
    name: (answerId, questionId) => ({
        question_id: questionId,
        id: answerId,
        name: 'Building images on docker'
    }),
    type: (answerId) => ({
        id: answerId,
        type: 'Core'
    }),
    priority: (answerId) => ({
        id: answerId,
        priority: 3
    }),
    description: (answerId) => ({
        id: answerId,
        description: 'Get into different steps with the as operator'
    }),
    id: (answerId) => ({
        id: answerId
    }),
    questionId: (questionId) => ({
        question_id: questionId.toString()
    })
}