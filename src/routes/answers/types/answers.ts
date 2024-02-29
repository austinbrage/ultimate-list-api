import { z } from 'zod'
import { answerSchema, answerQuerySchema } from '../schemas/answers'
import { type RowDataPacket, type ResultSetHeader } from 'mysql2'
import { type AsyncFunction } from '../../../services/errorHandler'

export type AnswerTypes = {
    id: z.infer<typeof answerSchema.id>
    data: z.infer<typeof answerSchema.data>
    questionId: z.infer<typeof answerSchema.questionId>
    idType: z.infer<typeof answerSchema.idType>
    idName: z.infer<typeof answerSchema.idName>
    idPriority: z.infer<typeof answerSchema.idPriority>
    questionIdName: z.infer<typeof answerSchema.questionIdName>
    idDescription: z.infer<typeof answerSchema.idDescription>
    fullData: z.infer<typeof answerSchema.fullData>
    questionIdQuery: z.infer<typeof answerQuerySchema.questionIdQuery>
}

export interface IAnswer {
    getAll({ question_id }: AnswerTypes['questionId']): Promise<RowDataPacket[]>
    getName({ question_id, name }: AnswerTypes['questionIdName']): Promise<RowDataPacket[]>
    getPriority({ question_id }: AnswerTypes['questionId']): Promise<RowDataPacket[]>
    changePriority({ id, priority }: AnswerTypes['idPriority']): Promise<ResultSetHeader>
    changeType({ id, type }: AnswerTypes['idType']): Promise<ResultSetHeader>
    changeName({ id, name }: AnswerTypes['idName']): Promise<ResultSetHeader>
    changeDescription({ id, description }: AnswerTypes['idDescription']): Promise<ResultSetHeader>
    addNew({ question_id, type, name, priority, description }: AnswerTypes['fullData']): Promise<ResultSetHeader>
    remove({ id }: AnswerTypes['id']): Promise<ResultSetHeader>
}

export interface AnswerController {
    getAll: AsyncFunction    
    changePriority: AsyncFunction
    changeType: AsyncFunction
    changeName: AsyncFunction
    changeDescription: AsyncFunction
    addNew: AsyncFunction
    remove: AsyncFunction
}