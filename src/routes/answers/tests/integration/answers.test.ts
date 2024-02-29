import request from "supertest"
import { app, server, userPool, researchPool, knowledgePool } from '../../../../server'
import { researchRoutes, researchMock } from "../../../researchs/tests/fixtures/researchData"
import { questionRoutes, questionMock } from "../../../questions/tests/fixtures/questionData"
import { answerMock, answerRoutes } from "../fixtures/answerData"
import { userMock, userRoutes } from "../../../users/tests/fixtures/userData"
import { RESEARCH, QUESTION, ANSWER, USER } from "../../../apiRoutes"

let token: string
let answerId: number
let questionId: number
let researchId: number

describe('Get access token from user sign up and in', () => {
    
    test('should SIGN-UP new user', async () => {
        await request(app)
            .post(userRoutes(USER.REGISTER))
            .send(userMock.signUp)
            .expect(201)
    })

    test('should LOGIN to users account', async () => {
        const response = await request(app)
            .post(userRoutes(USER.LOGIN))
            .send(userMock.rightData)
            .expect(200)
        token = response.body.result.token
    })  
    
})

describe('Test create and read new research card', () => {

    test('should POST new research card', async () => {
        await request(app)
            .post(researchRoutes(RESEARCH.DATA))
            .set('Authorization', `Bearer ${token}`)
            .send(researchMock.newData1)
            .expect(201)
    })

    test('should READ and GET ID from new research card', async () => {
        const response = await request(app)
            .get(researchRoutes(RESEARCH.DATA))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        researchId = response.body?.result?.data[0]?.id    
    })

})

describe('Test create and read new question item', () => {

    test('should POST new question item', async () => {
        await request(app)
            .post(questionRoutes(QUESTION.DATA))
            .set('Authorization', `Bearer ${token}`)
            .send(questionMock.newData1(researchId))
            .expect(201)
    })

    test('should READ and GET ID from new question item', async () => {
        const response = await request(app)
            .get(questionRoutes(QUESTION.DATA))
            .set('Authorization', `Bearer ${token}`)
            .query(questionMock.researchId(researchId))
            .expect(200)
        questionId = response.body?.result?.data[0]?.id      
    })

})

describe('Test create and read new answer item', () => {

    test('should POST new answer item', async () => {
        await request(app)
            .post(answerRoutes(ANSWER.DATA))
            .set('Authorization', `Bearer ${token}`)
            .send(answerMock.newData1(questionId))
            .expect(201)
    })

    test('should READ and GET ID from new answer item', async () => {
        const response = await request(app)
            .get(answerRoutes(ANSWER.DATA))
            .set('Authorization', `Bearer ${token}`)
            .query(answerMock.questionId(questionId))
            .expect(200)
        answerId = response.body?.result?.data[0]?.id

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining(answerMock.newData1(questionId))
        )         
    })

})

describe('Test update new answer item', () => {

    test('should PATCH NAME of new item', async () => {
        await request(app)
            .patch(answerRoutes(ANSWER.NAME))
            .set('Authorization', `Bearer ${token}`)
            .send(answerMock.name(answerId, questionId))
            .expect(200)
    })

    test('should PATCH TYPE of new item', async () => {
        await request(app)
            .patch(answerRoutes(ANSWER.TYPE))
            .set('Authorization', `Bearer ${token}`)
            .send(answerMock.type(answerId))
            .expect(200)
    })

    test('should PATCH PRIORITY of new item', async () => {
        await request(app)
            .patch(answerRoutes(ANSWER.PRIORITY))
            .set('Authorization', `Bearer ${token}`)
            .send(answerMock.priority(answerId))
            .expect(200)
    })

    test('should PATCH DESCRIPTION of new item', async () => {
        await request(app)
            .patch(answerRoutes(ANSWER.DESCRIPTION))
            .set('Authorization', `Bearer ${token}`)
            .send(answerMock.description(answerId))
            .expect(200)
    })

    test('should READ and GET ID from new answer item', async () => {
        const response = await request(app)
            .get(answerRoutes(ANSWER.DATA))
            .set('Authorization', `Bearer ${token}`)
            .query(answerMock.questionId(questionId))
            .expect(200)

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining(answerMock.changedData(questionId))
        )         
    })

})

describe('Test priority value on new answer item', () => {

    test('should POST new answer item', async () => {
        await request(app)
            .post(answerRoutes(ANSWER.DATA))
            .set('Authorization', `Bearer ${token}`)
            .send(answerMock.newData2(questionId))
            .expect(201)
    })

    test('should READ and GET ID from new answer item', async () => {
        const response = await request(app)
            .get(answerRoutes(ANSWER.DATA))
            .set('Authorization', `Bearer ${token}`)
            .query(answerMock.questionId(questionId))
            .expect(200)
        answerId = response.body?.result?.data[0]?.id
        
        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining({
                ...answerMock.newData2(questionId),
                priority: answerMock.priority(answerId).priority + 1
            })
        )         
    })
    
})

describe('Test delete new answer item', () => {

    test('should DELETE new answer item', async () => {
        await request(app)
            .delete(answerRoutes(ANSWER.DATA))
            .set('Authorization', `Bearer ${token}`)
            .send(answerMock.id(answerId))
            .expect(200)
    })

    test('should READ only one item after deleted answer', async () => {
        const response = await request(app)
            .get(answerRoutes(ANSWER.DATA))
            .set('Authorization', `Bearer ${token}`)
            .query(answerMock.questionId(questionId))
            .expect(200)

        expect(response.body.result.data).toHaveLength(1)
    })     

})

describe('Delete new user for next tests', () => {

    test('should DELETE new user', async () => {
        await request(app)
            .delete(userRoutes(USER.DATA))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })

    afterAll(async () => {
        server.close()
        userPool.end()
        researchPool.end()
        knowledgePool.end()
    })

})