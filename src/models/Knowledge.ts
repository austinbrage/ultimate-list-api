import type { KnowledgeTypes, IKnowledge } from "../types/knowledge"
import type { RowDataPacket, Pool } from "mysql2/promise" 
import { knowledgeQueries } from "../queries/knowledge"

class Knowledge implements IKnowledge {
    private pool

    constructor({ knowledgePool }: { knowledgePool: Pool }) {
        this.pool = knowledgePool
    }

    getAll = async ({ user_id }: KnowledgeTypes['userId']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            knowledgeQueries.getAll,
            [user_id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getName = async ({ user_id, name }: KnowledgeTypes['userIdName']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            knowledgeQueries.getName,
            [user_id, name]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changePriority = async ({ id, priority }: KnowledgeTypes['idPriority']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            knowledgeQueries.changePriority,
            [priority, id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changeType = async ({ id, type }: KnowledgeTypes['idType']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            knowledgeQueries.changeType,
            [type, id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changeName = async ({ id, name }: KnowledgeTypes['idName']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            knowledgeQueries.changeName,
            [name, id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changeDescription = async ({ id, description }: KnowledgeTypes['idDescription']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            knowledgeQueries.changeDescription,
            [description, id]
        )

        connection.release()
        return rows as RowDataPacket[]      
    }

    addNew = async ({ user_id, type, name, priority, description }: KnowledgeTypes['fullData']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            knowledgeQueries.addNew,
            [user_id, type, name, priority, description]
        )

        connection.release()
        return rows as RowDataPacket[]    
    }

    remove = async ({ id }: KnowledgeTypes['id']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            knowledgeQueries.remove,
            [id]
        )

        connection.release()
        return rows as RowDataPacket[]   
    }
}

export default Knowledge