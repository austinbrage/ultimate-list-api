import { z } from 'zod'
import { knowledgeSchema } from "../schemas/knowledge"
import { type RowDataPacket, type ResultSetHeader } from 'mysql2'
import { type AsyncFunction } from '../services/errorHandler'

export type KnowledgeTypes = {
    id: z.infer<typeof knowledgeSchema.id>
    userId: z.infer<typeof knowledgeSchema.userId>
    idType: z.infer<typeof knowledgeSchema.idType>
    idName: z.infer<typeof knowledgeSchema.idName>
    idPriority: z.infer<typeof knowledgeSchema.idPriority>
    userIdName: z.infer<typeof knowledgeSchema.userIdName>
    idDescription: z.infer<typeof knowledgeSchema.idDescription>
    fullData: z.infer<typeof knowledgeSchema.fullData>
    data: z.infer<typeof knowledgeSchema.data>
}

export interface IKnowledge {
    getAll({ user_id }: KnowledgeTypes['userId']): Promise<RowDataPacket[]>
    getName({ user_id, name }: KnowledgeTypes['userIdName']): Promise<RowDataPacket[]>
    getPriority({ user_id }: KnowledgeTypes['userId']): Promise<RowDataPacket[]>
    changePriority({ id, priority }: KnowledgeTypes['idPriority']): Promise<ResultSetHeader>
    changeType({ id, type }: KnowledgeTypes['idType']): Promise<ResultSetHeader>
    changeName({ id, name }: KnowledgeTypes['idName']): Promise<ResultSetHeader>
    changeDescription({ id, description }: KnowledgeTypes['idDescription']): Promise<ResultSetHeader>
    addNew({ user_id, type, name, priority, description }: KnowledgeTypes['fullData']): Promise<ResultSetHeader>
    remove({ id }: KnowledgeTypes['id']): Promise<ResultSetHeader>
}

export interface KnowledgeController {
    getAll: AsyncFunction    
    changePriority: AsyncFunction
    changeType: AsyncFunction
    changeName: AsyncFunction
    changeDescription: AsyncFunction
    addNew: AsyncFunction
    remove: AsyncFunction
}