import { z } from 'zod'
import { questionSchema, questionQuerySchema } from "../schemas/questions"
import { type RowDataPacket } from 'mysql2'
import { type AsyncFunction } from '../services/errorHandler'

export type QuestionTypes = {
    id: z.infer<typeof questionSchema.id>
    researchId: z.infer<typeof questionSchema.researchId>
    idName: z.infer<typeof questionSchema.idName>
    idPriority: z.infer<typeof questionSchema.idPriority>
    idDescription: z.infer<typeof questionSchema.idDescription>
    fullData: z.infer<typeof questionSchema.fullData>
    researchIdQuery: z.infer<typeof questionQuerySchema.researchIdQuery>
}

export interface IQuestion {
    getAll({ research_id }: QuestionTypes['researchId']): Promise<RowDataPacket[]>
    changeName({ id, name }: QuestionTypes['idName']): Promise<RowDataPacket[]>
    changePriority({ id, priority }: QuestionTypes['idPriority']): Promise<RowDataPacket[]>
    changeDescription({ id, description }: QuestionTypes['idDescription']): Promise<RowDataPacket[]>
    addNew({ research_id, name, description }: QuestionTypes['fullData']): Promise<RowDataPacket[]>
    remove({ id }: QuestionTypes['id']): Promise<RowDataPacket[]>
}

export interface QuestionController {
    getAll: AsyncFunction
    changeName: AsyncFunction
    changePriority: AsyncFunction
    changeDescription: AsyncFunction
    addNew: AsyncFunction
    remove: AsyncFunction
}