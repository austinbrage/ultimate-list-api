import { z } from 'zod'
import { researchSchema } from "../schemas/researchs"
import { type RowDataPacket } from 'mysql2'
import { type AsyncFunction } from '../services/errorHandler'

export type ResearchTypes = {
    id: z.infer<typeof researchSchema.id>
    userId: z.infer<typeof researchSchema.userId>
    idType: z.infer<typeof researchSchema.idType>
    idName: z.infer<typeof researchSchema.idName>
    idPriority: z.infer<typeof researchSchema.idPriority>
    userIdName: z.infer<typeof researchSchema.userIdName>
    idDescription: z.infer<typeof researchSchema.idDescription>
    fullData: z.infer<typeof researchSchema.fullData>
    data: z.infer<typeof researchSchema.data>
}

export interface IResearch {
    getAll({ user_id }: ResearchTypes['userId']): Promise<RowDataPacket[]>
    getName({ user_id, name }: ResearchTypes['userIdName']): Promise<RowDataPacket[]>
    getPriority({ user_id }: ResearchTypes['userId']): Promise<RowDataPacket[]>
    changePriority({ id, priority }: ResearchTypes['idPriority']): Promise<RowDataPacket[]>
    changeType({ id, type }: ResearchTypes['idType']): Promise<RowDataPacket[]>
    changeName({ id, name }: ResearchTypes['idName']): Promise<RowDataPacket[]>
    changeDescription({ id, description }: ResearchTypes['idDescription']): Promise<RowDataPacket[]>
    addNew({ user_id, type, name, priority, description }: ResearchTypes['fullData']): Promise<RowDataPacket[]>
    remove({ id }: ResearchTypes['id']): Promise<RowDataPacket[]>
}

export interface ResearchController {
    getAll: AsyncFunction    
    changePriority: AsyncFunction
    changeType: AsyncFunction
    changeName: AsyncFunction
    changeDescription: AsyncFunction
    addNew: AsyncFunction
    remove: AsyncFunction
}