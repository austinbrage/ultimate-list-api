import type { QuestionTypes, IQuestion } from "../types/questions"
import type { RowDataPacket, Pool } from "mysql2/promise" 
import { questionsQueries } from "../queries/questions"

class Question implements IQuestion {
    private pool

    constructor({ questionPool }: { questionPool: Pool }) {
        this.pool = questionPool
    }

    getAll = async ({ research_id }: QuestionTypes['researchId']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            questionsQueries.getAll,
            [research_id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getName = async ({ research_id, name }: QuestionTypes['researchIdName']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            questionsQueries.getName,
            [research_id, name]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getPriority = async ({ research_id }: QuestionTypes['researchId']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            questionsQueries.getLastPriority,
            [research_id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changeName = async ({ id, name }: QuestionTypes['idName']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            questionsQueries.changeName,
            [name, id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changePriority = async ({ id, priority }: QuestionTypes['idPriority']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            questionsQueries.changePriority,
            [priority, id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changeDescription = async ({ id, description }: QuestionTypes['idDescription']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            questionsQueries.changeDescription,
            [description, id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    addNew = async ({ research_id, name, priority, description }: QuestionTypes['fullData']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            questionsQueries.addNew,
            [research_id, name, priority, description]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    remove = async ({ id }: QuestionTypes['id']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            questionsQueries.remove,
            [id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }
}

export default Question