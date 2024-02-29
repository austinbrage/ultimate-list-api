import type { RowDataPacket, ResultSetHeader, Pool } from 'mysql2/promise'
import type { UserType, IUser } from '../types/users'
import { usersQueries } from '../sql/users'

class User implements IUser {
    private pool
    
    constructor({ userPool }: { userPool: Pool }) {
        this.pool = userPool
    }
    
    getId = async ({ api_key }: UserType['apiKey']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            usersQueries.getId, 
            [api_key]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getAll = async ({ id }: UserType['id']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            usersQueries.getAll, 
            [id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getName = async ({ name }: UserType['name']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            usersQueries.getName, 
            [name]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getEmail = async ({ email }: UserType['email']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            usersQueries.getEmail, 
            [email]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getNickname = async ({ nickname }: UserType['nickname']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            usersQueries.getNickname,
            [nickname]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getIdPassword = async ({ name }: UserType['name']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            usersQueries.getIdPassword, 
            [name]
        )

        connection.release()
        return rows as RowDataPacket[]
    }
    
    getByEmail = async ({ email }: UserType['email']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            usersQueries.getByEmail, 
            [email]
        )

        connection.release()
        return rows as RowDataPacket[]
    }
    
    getByExternalID = async ({ auth_provider, external_id }: UserType['authData']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            usersQueries.getByExternalId, 
            [auth_provider, external_id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }
    
    changeExternalID = async ({ auth_provider, external_id, email }: UserType['authEmail']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            usersQueries.changeExternalId, 
            [auth_provider, external_id, email]
        )

        connection.release()
        return rows as ResultSetHeader
    }
    
    changeName = async ({ id, name }: UserType['idName']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            usersQueries.changeName, 
            [name, id]
        )

        connection.release()
        return rows as ResultSetHeader
    }

    changeEmail = async ({ id, email }: UserType['idEmail']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            usersQueries.changeEmail, 
            [email, id]
        )

        connection.release()
        return rows as ResultSetHeader
    }

    changeNickname = async ({ id, nickname }: UserType['idNickname']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            usersQueries.changeNickname, 
            [nickname, id]
        )

        connection.release()
        return rows as ResultSetHeader
    }

    changePassword = async ({ id, password }: UserType['idPassword']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            usersQueries.changePassword, 
            [password, id]
        )

        connection.release()
        return rows as ResultSetHeader
    }

    remove = async ({ id }: UserType['id']) => {
        const connection = await this.pool.getConnection()
        
        const [rows] = await connection.execute(
            usersQueries.remove, 
            [id]
        )

        connection.release()
        return rows as ResultSetHeader
    }

    addNew = async ({ name, password, email, nickname, auth_provider, external_id }: UserType['fullData']) => {
        const connection = await this.pool.getConnection()
        
        const [results] = await connection.execute(
            usersQueries.addNew, 
            [name, password, email, nickname, auth_provider, external_id]
        ) as ResultSetHeader[]

        const newId = results.insertId

        connection.release()
        return newId as number
    }
}

export default User