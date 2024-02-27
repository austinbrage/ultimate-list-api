import { answerSchema, answerQuerySchema } from '../schemas/answers'
import { type AnswerTypes } from '../types/answers'
import { type SafeParseReturnType } from 'zod'

export interface IAnswersValidation {
    id(data: unknown): SafeParseReturnType<unknown, AnswerTypes['id']> 
    data(data: unknown): SafeParseReturnType<unknown, AnswerTypes['data']> 
    questionId(data: unknown): SafeParseReturnType<unknown, AnswerTypes['questionId']> 
    idType(data: unknown): SafeParseReturnType<unknown, AnswerTypes['idType']> 
    idName(data: unknown): SafeParseReturnType<unknown, AnswerTypes['idName']> 
    idPriority(data: unknown): SafeParseReturnType<unknown, AnswerTypes['idPriority']> 
    idDescription(data: unknown): SafeParseReturnType<unknown, AnswerTypes['idDescription']> 
    questionIdQuery(data: unknown): SafeParseReturnType<unknown, AnswerTypes['questionIdQuery']>
}

export class AnswersValidation implements IAnswersValidation {
    private answerSchema: typeof answerSchema
    private answerQuerySchema: typeof answerQuerySchema

    constructor() {
        this.answerSchema = answerSchema
        this.answerQuerySchema = answerQuerySchema
    }

    id = (data: unknown) => this.answerSchema.id.safeParse(data)
    data = (data: unknown) => this.answerSchema.data.safeParse(data)
    questionId = (data: unknown) => this.answerSchema.questionId.safeParse(data)
    idType = (data: unknown) => this.answerSchema.idType.safeParse(data)
    idName = (data: unknown) => this.answerSchema.idName.safeParse(data)
    idPriority = (data: unknown) => this.answerSchema.idPriority.safeParse(data)
    idDescription = (data: unknown) => this.answerSchema.idDescription.safeParse(data)
    questionIdQuery = (data: unknown) => this.answerQuerySchema.questionIdQuery.safeParse(data)
}