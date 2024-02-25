import { z } from 'zod'
import { conceptSchema, conceptQuerySchema } from "../schemas/concepts"
import { type RowDataPacket } from 'mysql2'
import { type AsyncFunction } from '../services/errorHandler'

export type ConceptTypes = {
    id: z.infer<typeof conceptSchema.id>
    knowledgeId: z.infer<typeof conceptSchema.knowledgeId>
    idType: z.infer<typeof conceptSchema.idType>
    idName: z.infer<typeof conceptSchema.idName>
    idPriority: z.infer<typeof conceptSchema.idPriority>
    knowledgeIdName: z.infer<typeof conceptSchema.knowledgeIdName>
    idDescription: z.infer<typeof conceptSchema.idDescription>
    fullData: z.infer<typeof conceptSchema.fullData>
    knowledgeIdQuery: z.infer<typeof conceptQuerySchema.knowledgeIdQuery>
}

export interface IConcept {
    getAll({ knowledge_id }: ConceptTypes['knowledgeId']): Promise<RowDataPacket[]>
    getName({ knowledge_id, name }: ConceptTypes['knowledgeIdName']): Promise<RowDataPacket[]>
    changePriority({ id, priority }: ConceptTypes['idPriority']): Promise<RowDataPacket[]>
    changeType({ id, type }: ConceptTypes['idType']): Promise<RowDataPacket[]>
    changeName({ id, name }: ConceptTypes['idName']): Promise<RowDataPacket[]>
    changeDescription({ id, description }: ConceptTypes['idDescription']): Promise<RowDataPacket[]>
    addNew({ knowledge_id, type, name, priority, description }: ConceptTypes['fullData']): Promise<RowDataPacket[]>
    remove({ id }: ConceptTypes['id']): Promise<RowDataPacket[]>
}

export interface ConceptController {
    getAll: AsyncFunction    
    changePriority: AsyncFunction
    changeType: AsyncFunction
    changeName: AsyncFunction
    changeDescription: AsyncFunction
    addNew: AsyncFunction
    remove: AsyncFunction
}