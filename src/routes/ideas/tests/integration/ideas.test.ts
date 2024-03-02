import request from "supertest"
import { app, server, userPool, ideaPool } from '../../../../server'
import { ideaMock, ideaRoutes } from "../fixtures/ideaData"
import { userMock, userRoutes } from "../../../users/tests/fixtures/userData"
import { IDEA, USER } from "../../../apiRoutes"

let token: string
let ideaId: number

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

describe('Test create and read new idea card', () => {

    test('should POST new idea card', async () => {
        await request(app)
            .post(ideaRoutes(IDEA.DATA))
            .set('Authorization', `Bearer ${token}`)
            .send(ideaMock.newData1)
            .expect(201)
    })

    test('should READ and GET ID from new idea card', async () => {
        const response = await request(app)
            .get(ideaRoutes(IDEA.DATA))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        ideaId = response.body?.result?.data[0]?.id

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining(ideaMock.newData1)
        )         
    })

})

describe('Test update new idea card', () => {

    test('should PATCH NAME of new card', async () => {
        await request(app)
            .patch(ideaRoutes(IDEA.NAME))
            .set('Authorization', `Bearer ${token}`)
            .send(ideaMock.name(ideaId))
            .expect(200)
    })

    test('should PATCH TYPE of new card', async () => {
        await request(app)
            .patch(ideaRoutes(IDEA.TYPE))
            .set('Authorization', `Bearer ${token}`)
            .send(ideaMock.type(ideaId))
            .expect(200)
    })

    test('should PATCH PRIORITY of new card', async () => {
        await request(app)
            .patch(ideaRoutes(IDEA.PRIORITY))
            .set('Authorization', `Bearer ${token}`)
            .send(ideaMock.priority(ideaId))
            .expect(200)
    })

    test('should PATCH DESCRIPTION of new card', async () => {
        await request(app)
            .patch(ideaRoutes(IDEA.DESCRIPTION))
            .set('Authorization', `Bearer ${token}`)
            .send(ideaMock.description(ideaId))
            .expect(200)
    })

    test('should PATCH SOLVED PROBLEM of new card', async () => {
        await request(app)
            .patch(ideaRoutes(IDEA.SOLVEDPROBLEM))
            .set('Authorization', `Bearer ${token}`)
            .send(ideaMock.solvedProblem(ideaId))
            .expect(200)
    })

    test('should READ and GET ID from new idea card', async () => {
        const response = await request(app)
            .get(ideaRoutes(IDEA.DATA))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining(ideaMock.changedData)
        )         
    })

})

describe('Test priority value on new idea card', () => {

    test('should POST new idea card', async () => {
        await request(app)
            .post(ideaRoutes(IDEA.DATA))
            .set('Authorization', `Bearer ${token}`)
            .send(ideaMock.newData2)
            .expect(201)
    })

    test('should READ and GET ID from new idea card', async () => {
        const response = await request(app)
            .get(ideaRoutes(IDEA.DATA))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
        ideaId = response.body?.result?.data[0]?.id
        
        expect(response.body.result.data[0]).toEqual(
            expect.objectContaining({
                ...ideaMock.newData2,
                priority: ideaMock.priority(ideaId).priority + 1
            })
        )         
    })
    
})

describe('Test delete new idea card', () => {

    test('should DELETE new idea card', async () => {
        await request(app)
            .delete(ideaRoutes(IDEA.DATA))
            .set('Authorization', `Bearer ${token}`)
            .send(ideaMock.id(ideaId))
            .expect(200)
    })

    test('should READ only one card after deleted idea', async () => {
        const response = await request(app)
            .get(ideaRoutes(IDEA.DATA))
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
        ideaPool.end()
    })

})