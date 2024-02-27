import request from 'supertest'
import { USER, KNOWLEDGE, CONCEPT } from '../../types/allRoutes'
import { userMock, userRoutes } from "../fixtures/userData"
import { knowledgeMock, knowledgeRoutes } from "../fixtures/knowledgeData"
import { conceptMock, conceptRoutes } from '../fixtures/conceptData'
import { app, server, userPool, knowledgePool } from '../../server'

let token: string
let conceptId: number
let knowledgeId: number

describe('Setup: Get access token from user sign up and in', () => { 
    
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

describe('Setup: Post new knowledge card and get the id', () => {

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
    })
    
})

describe('Test create and read new knowledge concept', () => {

    test('should POST new knowledge concept', async () => {
        await request(app)
            .post(conceptRoutes(CONCEPT.DATA))
            .set('Authorization', `Bearer ${token}`)
            .send(conceptMock.newData1(knowledgeId))
            .expect(201)
    })

    test('should READ and GET ID from new knowledge concept', async () => {
        const response = await request(app)
            .get(conceptRoutes(CONCEPT.DATA))
            .set('Authorization', `Bearer ${token}`)
            .query(conceptMock.knowledgeId(knowledgeId))
            .expect(200)
        conceptId = response.body?.result?.data[0]?.id

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining(conceptMock.newData1(knowledgeId))
        )         
    })

})

describe('Test update new knowledge concept', () => {

    test('should PATCH NAME of new concept', async () => {
        await request(app)
            .patch(conceptRoutes(CONCEPT.NAME))
            .set('Authorization', `Bearer ${token}`)
            .send(conceptMock.name(conceptId, knowledgeId))
            .expect(200)
    })

    test('should PATCH TYPE of new concept', async () => {
        await request(app)
            .patch(conceptRoutes(CONCEPT.TYPE))
            .set('Authorization', `Bearer ${token}`)
            .send(conceptMock.type(conceptId))
            .expect(200)
    })

    test('should PATCH PRIORITY of new concept', async () => {
        await request(app)
            .patch(conceptRoutes(CONCEPT.PRIORITY))
            .set('Authorization', `Bearer ${token}`)
            .send(conceptMock.priority(conceptId))
            .expect(200)
    })

    test('should PATCH DESCRIPTION of new concept', async () => {
        await request(app)
            .patch(conceptRoutes(CONCEPT.DESCRIPTION))
            .set('Authorization', `Bearer ${token}`)
            .send(conceptMock.description(conceptId))
            .expect(200)
    })

    test('should READ and GET ID from new knowledge concept', async () => {
        const response = await request(app)
            .get(conceptRoutes(CONCEPT.DATA))
            .set('Authorization', `Bearer ${token}`)
            .query(conceptMock.knowledgeId(knowledgeId))
            .expect(200)

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining(conceptMock.changedData(knowledgeId))
        )         
    })

})


describe('Test priority value of new knowledge concept', () => {

    test('should POST new knowledge concept', async () => {
        await request(app)
            .post(conceptRoutes(CONCEPT.DATA))
            .set('Authorization', `Bearer ${token}`)
            .send(conceptMock.newData2(knowledgeId))
            .expect(201)
    })

    test('should READ and GET ID from new knowledge concept', async () => {
        const response = await request(app)
            .get(conceptRoutes(CONCEPT.DATA))
            .set('Authorization', `Bearer ${token}`)
            .query(conceptMock.knowledgeId(knowledgeId))
            .expect(200)
        conceptId = response.body?.result?.data[0]?.id

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining({
                ...conceptMock.newData2(knowledgeId),
                priority: conceptMock.priority(conceptId).priority + 1
            })
        )         
    })

})

describe('Test delete new knowledge concept', () => {

    test('should DELETE new knowledge concept', async () => {
        await request(app)
            .delete(conceptRoutes(CONCEPT.DATA))
            .set('Authorization', `Bearer ${token}`)
            .send(conceptMock.id(conceptId))
            .expect(200)
    })

    test('should READ no data from deleted knowledge concept', async () => {
        const response = await request(app)
            .get(conceptRoutes(CONCEPT.DATA))
            .set('Authorization', `Bearer ${token}`)
            .query(conceptMock.knowledgeId(knowledgeId))
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