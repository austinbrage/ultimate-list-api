import request from "supertest"
import { app, server, userPool, researchPool, knowledgePool } from '../../server'
import { researchRoutes, researchMock } from "../fixtures/researchData"
import { questionMock, questionRoutes } from "../fixtures/questionData"
import { userMock, userRoutes } from "../fixtures/userData"
import { RESEARCH, QUESTION, USER } from "../../types/allRoutes"

let token: string
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

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining(researchMock.newData1)
        )         
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

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining(questionMock.newData1(researchId))
        )         
    })

})

describe('Test update new question item', () => {

    test('should PATCH NAME of new item', async () => {
        await request(app)
            .patch(questionRoutes(QUESTION.NAME))
            .set('Authorization', `Bearer ${token}`)
            .send(questionMock.name(questionId, researchId))
            .expect(200)
    })

    test('should PATCH PRIORITY of new item', async () => {
        await request(app)
            .patch(questionRoutes(QUESTION.PRIORITY))
            .set('Authorization', `Bearer ${token}`)
            .send(questionMock.priority(questionId))
            .expect(200)
    })

    test('should PATCH DESCRIPTION of new item', async () => {
        await request(app)
            .patch(questionRoutes(QUESTION.DESCRIPTION))
            .set('Authorization', `Bearer ${token}`)
            .send(questionMock.description(questionId))
            .expect(200)
    })

    test('should READ and GET ID from new question item', async () => {
        const response = await request(app)
            .get(questionRoutes(QUESTION.DATA))
            .set('Authorization', `Bearer ${token}`)
            .query(questionMock.researchId(researchId))
            .expect(200)

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining(questionMock.changedData(researchId))
        )         
    })

})

describe('Test priority value on new question item', () => {

    test('should POST new question item', async () => {
        await request(app)
            .post(questionRoutes(QUESTION.DATA))
            .set('Authorization', `Bearer ${token}`)
            .send(questionMock.newData2(researchId))
            .expect(201)
    })

    test('should READ and GET ID from new question item', async () => {
        const response = await request(app)
            .get(questionRoutes(QUESTION.DATA))
            .set('Authorization', `Bearer ${token}`)
            .query(questionMock.researchId(researchId))
            .expect(200)
        questionId = response.body?.result?.data[0]?.id
        
        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining({
                ...questionMock.newData2(researchId),
                priority: questionMock.priority(researchId).priority + 1
            })
        )         
    })
    
})

describe('Test delete new question item', () => {

    test('should DELETE new question item', async () => {
        await request(app)
            .delete(questionRoutes(QUESTION.DATA))
            .set('Authorization', `Bearer ${token}`)
            .send(questionMock.id(questionId))
            .expect(200)
    })

    test('should READ no data from deleted question item', async () => {
        const response = await request(app)
            .get(questionRoutes(QUESTION.DATA))
            .set('Authorization', `Bearer ${token}`)
            .query(questionMock.researchId(researchId))
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