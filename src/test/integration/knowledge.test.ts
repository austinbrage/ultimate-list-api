import request from "supertest"
import { app, server, userPool, knowledgePool } from './../../server'
import { knowledgeMock } from "../fixtures/knowledgeData"
import { userMock } from "../fixtures/userData"

let token: string
let knowledgeId: number

const RESOURCE = '/ultimate-list/knowledge'
const USER_RESOURCE = '/ultimate-list/user'

describe('Get access token from user sign up and in', () => {
    
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

describe('Test create and read new knowledge card', () => {

    test('should POST new knowledge card', async () => {
        await request(app)
            .post(`${RESOURCE}/data`)
            .set('Authorization', `Bearer ${token}`)
            .send(knowledgeMock.newData)
            .expect(201)
    })

    test('should READ and GET ID from new knowledge card', async () => {
        const response = await request(app)
            .get(`${RESOURCE}/data`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        knowledgeId = response.body?.result?.data[0]?.id

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining(knowledgeMock.newData)
        )         
    })

})

describe('Test update new knowledge card', () => {

    test('should PATCH NAME of new card', async () => {
        await request(app)
            .patch(`${RESOURCE}/name`)
            .set('Authorization', `Bearer ${token}`)
            .send(knowledgeMock.name(knowledgeId))
            .expect(200)
    })

    test('should PATCH TYPE of new card', async () => {
        await request(app)
            .patch(`${RESOURCE}/type`)
            .set('Authorization', `Bearer ${token}`)
            .send(knowledgeMock.type(knowledgeId))
            .expect(200)
    })

    test('should PATCH PRIORITY of new card', async () => {
        await request(app)
            .patch(`${RESOURCE}/priority`)
            .set('Authorization', `Bearer ${token}`)
            .send(knowledgeMock.priority(knowledgeId))
            .expect(200)
    })

    test('should PATCH DESCRIPTION of new card', async () => {
        await request(app)
            .patch(`${RESOURCE}/description`)
            .set('Authorization', `Bearer ${token}`)
            .send(knowledgeMock.description(knowledgeId))
            .expect(200)
    })

    test('should READ and GET ID from new knowledge card', async () => {
        const response = await request(app)
            .get(`${RESOURCE}/data`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining(knowledgeMock.changedData)
        )         
    })

})

describe('Test delete new knowledge card', () => {

    test('should DELETE new knowledge card', async () => {
        await request(app)
            .delete(`${RESOURCE}/data`)
            .set('Authorization', `Bearer ${token}`)
            .send(knowledgeMock.id(knowledgeId))
            .expect(200)
    })

    test('should READ no data from deleted knowledge card', async () => {
        const response = await request(app)
            .get(`${RESOURCE}/data`)
            .set('Authorization', `Bearer ${token}`)
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