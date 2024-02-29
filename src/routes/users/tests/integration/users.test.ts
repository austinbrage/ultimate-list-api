import request from 'supertest'
import { USER } from '../../../apiRoutes'
import { app, server, userPool, knowledgePool } from './../../../../server'
import { userMock, userRoutes } from './../fixtures/userData'

let token: string
let apiKey: string

describe('Test register new user', () => {

    test('should SIGN-UP new user', async () => {
        await request(app)
            .post(userRoutes(USER.REGISTER))
            .send(userMock.signUp)
            .expect(201)
    })
    
    test('should SIGN-IN new user', async () => {
        const response = await request(app)
            .post(userRoutes(USER.LOGIN))
            .send(userMock.rightData)
            .expect(200)
        token = response.body.result.token
    })

    test('should READ new user', async () => {
        const userData = await request(app)
            .get(userRoutes(USER.DATA))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(userData.body.result.data[0])
            .toMatchObject(userMock.userData)

        apiKey = userData.body.result.data[0].api_key
    })

    test('should SIGN-IN new user by api_key', async () => {
        const response = await request(app)
            .post(userRoutes(USER.KEY))
            .send({ api_key: apiKey })
            .expect(200)
        token = response.body.result.token
    })
})

describe('Test successful and unseccessful login', () => {

    test('should NOT LOGIN if username is incorrect', async () => {
        await request(app)
            .post(userRoutes(USER.LOGIN))
            .send(userMock.badUser)
            .expect(401)
    })

    test('should NOT LOGIN if password is incorrect', async () => {
        await request(app)
            .post(userRoutes(USER.LOGIN))
            .send(userMock.badPassword)
            .expect(401)
    })

    test('should NOT LOGIN if username and password are incorrect', async () => {
        await request(app)
            .post(userRoutes(USER.LOGIN))
            .send(userMock.badData)
            .expect(401)
    })

    test('should LOGIN if username and password are correct', async () => {
        await request(app)
            .post(userRoutes(USER.LOGIN))
            .send(userMock.rightData)
            .expect(200)
    })
})

describe('Test update user data', () => {

    test('should PATCH the user data', async () => {
        await request(app)
            .patch(userRoutes(USER.EMAIL))
            .set('Authorization', `Bearer ${token}`)
            .send({ email: userMock.patchData.email })
            .expect(200)

        await request(app)
            .patch(userRoutes(USER.NICKNAME))
            .set('Authorization', `Bearer ${token}`)
            .send({ nickname: userMock.patchData.nickname })
            .expect(200)
        
        await request(app)
            .patch(userRoutes(USER.NAME))
            .set('Authorization', `Bearer ${token}`)
            .send({ name: userMock.patchData.name })
            .expect(200)

        await request(app)
            .patch(userRoutes(USER.PASSWORD))
            .set('Authorization', `Bearer ${token}`)
            .send({ password: userMock.patchData.password })
            .expect(200)
    })

    test('should READ new data in user', async () => {
        const userData = await request(app)
            .get(userRoutes(USER.DATA))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(userData.body.result.data[0])
            .toMatchObject(userMock.newData)
    })

    test('should SIGN-IN only with new data in user', async () => {
        await request(app)
            .post(userRoutes(USER.LOGIN))
            .send(userMock.rightData)
            .expect(401)

        const response = await request(app)
            .post(userRoutes(USER.LOGIN))
            .send(userMock.newRightData)
            .expect(200)

        token = response.body.result.token
    })
})

describe('Test successful logout', () => {
    
    test('should LOGOUT by cleaning token', async () => {
        token = ''
        expect(true)
    })

    test('should NOT READ data after signout', async () => {
        
        await request(app)
            .get(userRoutes(USER.DATA))
            .set('Authorization', `Bearer ${token}`)
            .expect(401)
    })

    test('should SIGN-IN new user again', async () => {
        const response = await request(app)
            .post(userRoutes(USER.LOGIN))
            .send(userMock.newRightData)
            .expect(200)
            
        token = response.body.result.token
    })
})

describe('Test delete new user', () => {
    
    test('should DELETE new user', async () => {
        await request(app)
            .delete(userRoutes(USER.DATA))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })

    test('should READ no data on deleted user', async () => {
        const response = await request(app)
            .get(userRoutes(USER.DATA))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body.result.data).toHaveLength(0)
    })
})

describe('Test open authentication and authorization', () => {
    
    test('should SIGN-UP new user', async () => {
        const response = await request(app)
            .post(userRoutes(USER.OAUTH))
            .send(userMock.fakeOAuth)
            .expect(201)
        token = response.body.result.token
    })

    test('should READ new user after sign up', async () => {
        const response = await request(app)
            .get(userRoutes(USER.DATA))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body.result.data[0].name)
            .toBe('Fake email name')
    })

    test('should SIGN-IN same new user', async () => {
        const response = await request(app)
            .post(userRoutes(USER.OAUTH))
            .send(userMock.fakeOAuth)
            .expect(200)
        token = response.body.result.token
    })

    test('should READ new user after sign in', async () => {
        const response = await request(app)
            .get(userRoutes(USER.DATA))
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body.result.data[0].name)
            .toBe('Fake email name')
    })

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