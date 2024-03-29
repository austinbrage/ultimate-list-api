import { questionSchema, questionQuerySchema } from '../schemas/questions'
import { type QuestionTypes } from '../types/questions'
import { type SafeParseReturnType } from 'zod'

export interface IQuestionValidation {
    id(data: unknown): SafeParseReturnType<unknown, QuestionTypes['id']> 
    data(data: unknown): SafeParseReturnType<unknown, QuestionTypes['data']> 
    researchId(data: unknown): SafeParseReturnType<unknown, QuestionTypes['researchId']> 
    idName(data: unknown): SafeParseReturnType<unknown, QuestionTypes['idName']> 
    idPriority(data: unknown): SafeParseReturnType<unknown, QuestionTypes['idPriority']> 
    idDescription(data: unknown): SafeParseReturnType<unknown, QuestionTypes['idDescription']> 
    researchIdQuery(data: unknown): SafeParseReturnType<unknown, QuestionTypes['researchIdQuery']> 
}

export class QuestionValidation implements IQuestionValidation {
    private questionSchema: typeof questionSchema
    private questionQuerySchema: typeof questionQuerySchema

    constructor() {
        this.questionSchema = questionSchema
        this.questionQuerySchema = questionQuerySchema
    }

    id = (data: unknown) => this.questionSchema.id.safeParse(data)
    data = (data: unknown) => this.questionSchema.data.safeParse(data)
    researchId = (data: unknown) => this.questionSchema.researchId.safeParse(data)
    idName = (data: unknown) => this.questionSchema.idName.safeParse(data)
    idPriority = (data: unknown) => this.questionSchema.idPriority.safeParse(data)
    idDescription = (data: unknown) => this.questionSchema.idDescription.safeParse(data)
    researchIdQuery = (data: unknown) => this.questionQuerySchema.researchIdQuery.safeParse(data)
}