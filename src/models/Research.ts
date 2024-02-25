import type { ResearchTypes, IResearch } from "../types/researchs"
import type { RowDataPacket, Pool } from "mysql2/promise" 
import { researchsQueries } from "../queries/researchs"

class Research implements IResearch {
    private pool

    constructor({ researchPool }: { researchPool: Pool }) {
        this.pool = researchPool
    }

    getAll = async ({ user_id }: ResearchTypes['userId']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            researchsQueries.getAll,
            [user_id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getName = async ({ user_id, name }: ResearchTypes['userIdName']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            researchsQueries.getName,
            [user_id, name]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changePriority = async ({ id, priority }: ResearchTypes['idPriority']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            researchsQueries.changePriority,
            [priority, id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changeType = async ({ id, type }: ResearchTypes['idType']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            researchsQueries.changeType,
            [type, id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changeName = async ({ id, name }: ResearchTypes['idName']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            researchsQueries.changeName,
            [name, id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changeDescription = async ({ id, description }: ResearchTypes['idDescription']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            researchsQueries.changeDescription,
            [description, id]
        )

        connection.release()
        return rows as RowDataPacket[]      
    }

    addNew = async ({ user_id, type, name, priority, description }: ResearchTypes['fullData']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            researchsQueries.addNew,
            [user_id, type, name, priority, description]
        )

        connection.release()
        return rows as RowDataPacket[]    
    }

    remove = async ({ id }: ResearchTypes['id']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            researchsQueries.remove,
            [id]
        )

        connection.release()
        return rows as RowDataPacket[]   
    }
}

export default Research