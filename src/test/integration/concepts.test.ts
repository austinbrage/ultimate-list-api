import request from 'supertest'
import { userMock } from "../fixtures/userData"
import { knowledgeMock } from "../fixtures/knowledgeData"
import { conceptMock } from '../fixtures/conceptData'
import { app, server, userPool, knowledgePool } from '../../server'

let token: string
let conceptId: number
let knowledgeId: number

const RESOURCE = '/ultimate-list/concept'
const USER_RESOURCE = '/ultimate-list/user'
const KNOWLEDGE_RESOURCE = '/ultimate-list/knowledge'

describe('Setup: Get access token from user sign up and in', () => { 
    
    test('should SIGN-UP new user', async () => {
        await request(app)
            .post(`${USER_RESOURCE}/register`)
            .send(userMock.signUp)
            .expect(201)
    })

    test('should LOGIN to users account', async () => {
        const response = await request(app)
            .post(`${USER_RESOURCE}/login`)
            .send(userMock.rightData)
            .expect(200)
        token = response.body.result.token
    })  

})

describe('Setup: Post new knowledge card and get the id', () => {

    test('should POST new knowledge card', async () => {
        await request(app)
            .post(`${KNOWLEDGE_RESOURCE}/data`)
            .set('Authorization', `Bearer ${token}`)
            .send(knowledgeMock.newData)
            .expect(201)
    })

    test('should READ and GET ID from new knowledge card', async () => {
        const response = await request(app)
            .get(`${KNOWLEDGE_RESOURCE}/data`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        knowledgeId = response.body?.result?.data[0]?.id
    })
    
})

describe('Test create and read new knowledge concept', () => {

    test('should POST new knowledge concept', async () => {
        await request(app)
            .post(`${RESOURCE}/data`)
            .set('Authorization', `Bearer ${token}`)
            .send(conceptMock.newData(knowledgeId))
            .expect(201)
    })

    test('should READ and GET ID from new knowledge concept', async () => {
        const response = await request(app)
            .get(`${RESOURCE}/data`)
            .set('Authorization', `Bearer ${token}`)
            .query(conceptMock.knowledgeId(knowledgeId))
            .expect(200)
        conceptId = response.body?.result?.data[0]?.id

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining(conceptMock.newData(knowledgeId))
        )         
    })

})



describe('Test update new knowledge concept', () => {

    test('should PATCH NAME of new concept', async () => {
        await request(app)
            .patch(`${RESOURCE}/name`)
            .set('Authorization', `Bearer ${token}`)
            .send(conceptMock.name(conceptId, knowledgeId))
            .expect(200)
    })

    test('should PATCH TYPE of new concept', async () => {
        await request(app)
            .patch(`${RESOURCE}/type`)
            .set('Authorization', `Bearer ${token}`)
            .send(conceptMock.type(conceptId))
            .expect(200)
    })

    test('should PATCH PRIORITY of new concept', async () => {
        await request(app)
            .patch(`${RESOURCE}/priority`)
            .set('Authorization', `Bearer ${token}`)
            .send(conceptMock.priority(conceptId))
            .expect(200)
    })

    test('should PATCH DESCRIPTION of new concept', async () => {
        await request(app)
            .patch(`${RESOURCE}/description`)
            .set('Authorization', `Bearer ${token}`)
            .send(conceptMock.description(conceptId))
            .expect(200)
    })

    test('should READ and GET ID from new knowledge concept', async () => {
        const response = await request(app)
            .get(`${RESOURCE}/data`)
            .set('Authorization', `Bearer ${token}`)
            .query(conceptMock.knowledgeId(knowledgeId))
            .expect(200)

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining(conceptMock.changedData(knowledgeId))
        )         
    })

})

describe('Test delete new knowledge concept', () => {

    test('should DELETE new knowledge concept', async () => {
        await request(app)
            .delete(`${RESOURCE}/data`)
            .set('Authorization', `Bearer ${token}`)
            .send(conceptMock.id(conceptId))
            .expect(200)
    })

    test('should READ no data from deleted knowledge concept', async () => {
        const response = await request(app)
            .get(`${RESOURCE}/data`)
            .set('Authorization', `Bearer ${token}`)
            .query(conceptMock.knowledgeId(knowledgeId))
            .expect(200)

        expect(response.body.result.data).toHaveLength(0)
    })     

})

describe('Delete new user for next tests', () => {

    test('should DELETE new user', async () => {
        await request(app)
            .delete(`${USER_RESOURCE}/data`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })

    afterAll(async () => {
        server.close()
        userPool.end()
        knowledgePool.end()
    })

})