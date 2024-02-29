import { z } from 'zod'
import { questionSchema, questionQuerySchema } from "../schemas/questions"
import { type RowDataPacket, type ResultSetHeader } from 'mysql2'
import { type AsyncFunction } from '../../../services/errorHandler'

export type QuestionTypes = {
    id: z.infer<typeof questionSchema.id>
    researchId: z.infer<typeof questionSchema.researchId>
    idName: z.infer<typeof questionSchema.idName>
    idPriority: z.infer<typeof questionSchema.idPriority>
    idDescription: z.infer<typeof questionSchema.idDescription>
    fullData: z.infer<typeof questionSchema.fullData>
    data: z.infer<typeof questionSchema.data>
    researchIdName: z.infer<typeof questionSchema.researchIdName>
    researchIdQuery: z.infer<typeof questionQuerySchema.researchIdQuery>
}

export interface IQuestion {
    getAll({ research_id }: QuestionTypes['researchId']): Promise<RowDataPacket[]>
    getName({ research_id, name }: QuestionTypes['researchIdName']): Promise<RowDataPacket[]>
    getPriority({ research_id }: QuestionTypes['researchId']): Promise<RowDataPacket[]>
    changeName({ research_id, id, name }: QuestionTypes['idName']): Promise<ResultSetHeader>
    changePriority({ id, priority }: QuestionTypes['idPriority']): Promise<ResultSetHeader>
    changeDescription({ id, description }: QuestionTypes['idDescription']): Promise<ResultSetHeader>
    addNew({ research_id, name, priority, description }: QuestionTypes['fullData']): Promise<ResultSetHeader>
    remove({ id }: QuestionTypes['id']): Promise<ResultSetHeader>
}

export interface QuestionController {
    getAll: AsyncFunction
    changeName: AsyncFunction
    changePriority: AsyncFunction
    changeDescription: AsyncFunction
    addNew: AsyncFunction
    remove: AsyncFunction
}