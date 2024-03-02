import type { RowDataPacket, ResultSetHeader, Pool } from "mysql2/promise" 
import type { IdeaTypes, IIdea } from "../types/ideas"
import { ideasQueries } from "../sql/ideas"

class Idea implements IIdea {
    private pool

    constructor({ ideaPool }: { ideaPool: Pool }) {
        this.pool = ideaPool
    }

    getAll = async ({ user_id }: IdeaTypes['userId']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            ideasQueries.getAll,
            [user_id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getName = async ({ user_id, name }: IdeaTypes['userIdName']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            ideasQueries.getName,
            [user_id, name]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getPriority = async ({ user_id }: IdeaTypes['userId']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            ideasQueries.getLastPriority,
            [user_id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changePriority = async ({ id, priority }: IdeaTypes['idPriority']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            ideasQueries.changePriority,
            [priority, id]
        )

        connection.release()
        return rows as ResultSetHeader
    }

    changeType = async ({ id, type }: IdeaTypes['idType']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            ideasQueries.changeType,
            [type, id]
        )

        connection.release()
        return rows as ResultSetHeader
    }

    changeName = async ({ id, name }: IdeaTypes['idName']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            ideasQueries.changeName,
            [name, id]
        )

        connection.release()
        return rows as ResultSetHeader
    }

    changeDescription = async ({ id, description }: IdeaTypes['idDescription']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            ideasQueries.changeDescription,
            [description, id]
        )

        connection.release()
        return rows as ResultSetHeader      
    }

    changeSolvedProblem = async ({ id, solved_problem }: IdeaTypes['idSolvedProblem']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            ideasQueries.changeSolvedProblem,
            [solved_problem, id]
        )

        connection.release()
        return rows as ResultSetHeader      
    }

    addNew = async ({ user_id, type, name, priority, description, solved_problem }: IdeaTypes['fullData']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            ideasQueries.addNew,
            [user_id, type, name, priority, description, solved_problem]
        )

        connection.release()
        return rows as ResultSetHeader    
    }

    remove = async ({ id }: IdeaTypes['id']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            ideasQueries.remove,
            [id]
        )

        connection.release()
        return rows as ResultSetHeader   
    }
}

export default Idea