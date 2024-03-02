import type { RowDataPacket, ResultSetHeader, Pool } from "mysql2/promise" 
import type { AnswerTypes, IAnswer } from "../types/answers"
import { answersQueries } from "../sql/answers"

class Answer implements IAnswer {
    private pool

    constructor({ answerPool }: { answerPool: Pool }) {
        this.pool = answerPool
    }

    getAll = async ({ question_id }: AnswerTypes['questionId']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            answersQueries.getAll,
            [question_id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getName = async ({ question_id, name }: AnswerTypes['questionIdName']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            answersQueries.getName,
            [question_id, name]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getPriority = async ({ question_id }: AnswerTypes['questionId']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            answersQueries.getLastPriority,
            [question_id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changePriority = async ({ id, priority }: AnswerTypes['idPriority']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            answersQueries.changePriority,
            [priority, id]
        )

        connection.release()
        return rows as ResultSetHeader
    }

    changeType = async ({ id, type }: AnswerTypes['idType']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            answersQueries.changeType,
            [type, id]
        )

        connection.release()
        return rows as ResultSetHeader
    }

    changeName = async ({ id, name }: AnswerTypes['idName']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            answersQueries.changeName,
            [name, id]
        )

        connection.release()
        return rows as ResultSetHeader
    }

    changeDescription = async ({ id, description }: AnswerTypes['idDescription']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            answersQueries.changeDescription,
            [description, id]
        )

        connection.release()
        return rows as ResultSetHeader      
    }

    addNew = async ({ question_id, type, name, priority, description }: AnswerTypes['fullData']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            answersQueries.addNew,
            [question_id, type, name, priority, description]
        )

        connection.release()
        return rows as ResultSetHeader    
    }

    remove = async ({ id }: AnswerTypes['id']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            answersQueries.remove,
            [id]
        )

        connection.release()
        return rows as ResultSetHeader   
    }
}

export default Answer