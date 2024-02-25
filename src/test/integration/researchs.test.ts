import request from "supertest"
import { userRoutes } from "../fixtures/userData"
import { app, server, userPool, researchPool, knowledgePool } from './../../server'
import { researchMock, researchRoutes } from "../fixtures/researchData"
import { userMock } from "../fixtures/userData"
import { RESEARCH, USER } from "../../types/allRoutes"

let token: string
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
            .send(researchMock.newData)
            .expect(201)
    })

    test('should READ and GET ID from new research card', async () => {
        const response = await request(app)
            .get(researchRoutes(RESEARCH.DATA))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        researchId = response.body?.result?.data[0]?.id

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining(researchMock.newData)
        )         
    })

})

describe('Test update new research card', () => {

    test('should PATCH NAME of new card', async () => {
        await request(app)
            .patch(researchRoutes(RESEARCH.NAME))
            .set('Authorization', `Bearer ${token}`)
            .send(researchMock.name(researchId))
            .expect(200)
    })

    test('should PATCH TYPE of new card', async () => {
        await request(app)
            .patch(researchRoutes(RESEARCH.TYPE))
            .set('Authorization', `Bearer ${token}`)
            .send(researchMock.type(researchId))
            .expect(200)
    })

    test('should PATCH PRIORITY of new card', async () => {
        await request(app)
            .patch(researchRoutes(RESEARCH.PRIORITY))
            .set('Authorization', `Bearer ${token}`)
            .send(researchMock.priority(researchId))
            .expect(200)
    })

    test('should PATCH DESCRIPTION of new card', async () => {
        await request(app)
            .patch(researchRoutes(RESEARCH.DESCRIPTION))
            .set('Authorization', `Bearer ${token}`)
            .send(researchMock.description(researchId))
            .expect(200)
    })

    test('should READ and GET ID from new research card', async () => {
        const response = await request(app)
            .get(researchRoutes(RESEARCH.DATA))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining(researchMock.changedData)
        )         
    })

})

describe('Test delete new research card', () => {

    test('should DELETE new research card', async () => {
        await request(app)
            .delete(researchRoutes(RESEARCH.DATA))
            .set('Authorization', `Bearer ${token}`)
            .send(researchMock.id(researchId))
            .expect(200)
    })

    test('should READ no data from deleted research card', async () => {
        const response = await request(app)
            .get(researchRoutes(RESEARCH.DATA))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body.result.data).toHaveLength(0)
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