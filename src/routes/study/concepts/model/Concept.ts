import type { RowDataPacket, ResultSetHeader, Pool } from "mysql2/promise" 
import type { ConceptTypes, IConcept } from "../types/concepts"
import { conceptsQueries } from "../sql/concepts"

class Concept implements IConcept {
    private pool

    constructor({ conceptPool }: { conceptPool: Pool }) {
        this.pool = conceptPool
    }

    getAll = async ({ knowledge_id }: ConceptTypes['knowledgeId']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            conceptsQueries.getAll,
            [knowledge_id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getName = async ({ knowledge_id, name }: ConceptTypes['knowledgeIdName']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            conceptsQueries.getName,
            [knowledge_id, name]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    getPriority = async ({ knowledge_id }: ConceptTypes['knowledgeId']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            conceptsQueries.getLastPriority,
            [knowledge_id]
        )

        connection.release()
        return rows as RowDataPacket[]
    }

    changePriority = async ({ id, priority }: ConceptTypes['idPriority']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            conceptsQueries.changePriority,
            [priority, id]
        )

        connection.release()
        return rows as ResultSetHeader
    }

    changeType = async ({ id, type }: ConceptTypes['idType']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            conceptsQueries.changeType,
            [type, id]
        )

        connection.release()
        return rows as ResultSetHeader
    }

    changeName = async ({ id, name }: ConceptTypes['idName']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            conceptsQueries.changeName,
            [name, id]
        )

        connection.release()
        return rows as ResultSetHeader
    }

    changeDescription = async ({ id, description }: ConceptTypes['idDescription']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            conceptsQueries.changeDescription,
            [description, id]
        )

        connection.release()
        return rows as ResultSetHeader      
    }

    addNew = async ({ knowledge_id, type, name, priority, description }: ConceptTypes['fullData']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            conceptsQueries.addNew,
            [knowledge_id, type, name, priority, description]
        )

        connection.release()
        return rows as ResultSetHeader    
    }

    remove = async ({ id }: ConceptTypes['id']) => {
        const connection = await this.pool.getConnection()

        const [rows] = await connection.execute(
            conceptsQueries.remove,
            [id]
        )

        connection.release()
        return rows as ResultSetHeader   
    }
}

export default Concept