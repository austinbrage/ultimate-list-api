import request from "supertest"
import { app, server, userPool, knowledgePool } from '../../../../server'
import { knowledgeMock, knowledgeRoutes } from "../fixtures/knowledgeData"
import { userMock, userRoutes } from "../../../users/tests/fixtures/userData"
import { KNOWLEDGE, USER } from "../../../apiRoutes"

let token: string
let knowledgeId: number

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

describe('Test create and read new knowledge card', () => {

    test('should POST new knowledge card', async () => {
        await request(app)
            .post(knowledgeRoutes(KNOWLEDGE.DATA))
            .set('Authorization', `Bearer ${token}`)
            .send(knowledgeMock.newData1)
            .expect(201)
    })

    test('should READ and GET ID from new knowledge card', async () => {
        const response = await request(app)
            .get(knowledgeRoutes(KNOWLEDGE.DATA))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        knowledgeId = response.body?.result?.data[0]?.id

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining(knowledgeMock.newData1)
        )         
    })

})

describe('Test update new knowledge card', () => {

    test('should PATCH NAME of new card', async () => {
        await request(app)
            .patch(knowledgeRoutes(KNOWLEDGE.NAME))
            .set('Authorization', `Bearer ${token}`)
            .send(knowledgeMock.name(knowledgeId))
            .expect(200)
    })

    test('should PATCH TYPE of new card', async () => {
        await request(app)
            .patch(knowledgeRoutes(KNOWLEDGE.TYPE))
            .set('Authorization', `Bearer ${token}`)
            .send(knowledgeMock.type(knowledgeId))
            .expect(200)
    })

    test('should PATCH PRIORITY of new card', async () => {
        await request(app)
            .patch(knowledgeRoutes(KNOWLEDGE.PRIORITY))
            .set('Authorization', `Bearer ${token}`)
            .send(knowledgeMock.priority(knowledgeId))
            .expect(200)
    })

    test('should PATCH DESCRIPTION of new card', async () => {
        await request(app)
            .patch(knowledgeRoutes(KNOWLEDGE.DESCRIPTION))
            .set('Authorization', `Bearer ${token}`)
            .send(knowledgeMock.description(knowledgeId))
            .expect(200)
    })

    test('should READ and GET ID from new knowledge card', async () => {
        const response = await request(app)
            .get(knowledgeRoutes(KNOWLEDGE.DATA))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining(knowledgeMock.changedData)
        )         
    })

})

describe('Test priority value on new knowledge card', () => {

    test('should POST new knowledge card', async () => {
        await request(app)
            .post(knowledgeRoutes(KNOWLEDGE.DATA))
            .set('Authorization', `Bearer ${token}`)
            .send(knowledgeMock.newData2)
            .expect(201)
    })

    test('should READ and GET ID from new knowledge card', async () => {
        const response = await request(app)
            .get(knowledgeRoutes(KNOWLEDGE.DATA))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        knowledgeId = response.body?.result?.data[0]?.id

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining({
                ...knowledgeMock.newData2,
                priority: knowledgeMock.priority(knowledgeId).priority + 1
            })
        )         
    })

})

describe('Test delete new knowledge card', () => {

    test('should DELETE new knowledge card', async () => {
        await request(app)
            .delete(knowledgeRoutes(KNOWLEDGE.DATA))
            .set('Authorization', `Bearer ${token}`)
            .send(knowledgeMock.id(knowledgeId))
            .expect(200)
    })

    test('should READ only one card after deleted knowledge', async () => {
        const response = await request(app)
            .get(knowledgeRoutes(KNOWLEDGE.DATA))
            .set('Authorization', `Bearer ${token}`)
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
        knowledgePool.end()
    })

})