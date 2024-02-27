import { knowledgeSchema } from '../schemas/knowledge'
import { type KnowledgeTypes } from '../types/knowledge'
import { type SafeParseReturnType } from 'zod'

export interface IKnowledgeValidation {
    id(data: unknown): SafeParseReturnType<unknown, KnowledgeTypes['id']> 
    data(data: unknown): SafeParseReturnType<unknown, KnowledgeTypes['data']> 
    userId(data: unknown): SafeParseReturnType<unknown, KnowledgeTypes['userId']> 
    idType(data: unknown): SafeParseReturnType<unknown, KnowledgeTypes['idType']> 
    idName(data: unknown): SafeParseReturnType<unknown, KnowledgeTypes['idName']> 
    idPriority(data: unknown): SafeParseReturnType<unknown, KnowledgeTypes['idPriority']> 
    idDescription(data: unknown): SafeParseReturnType<unknown, KnowledgeTypes['idDescription']> 
}

export class KnowledgeValidation implements IKnowledgeValidation {
    private knowledgeSchema: typeof knowledgeSchema

    constructor() {
        this.knowledgeSchema = knowledgeSchema
    }

    id = (data: unknown) => this.knowledgeSchema.id.safeParse(data)
    data = (data: unknown) => this.knowledgeSchema.data.safeParse(data)
    userId = (data: unknown) => this.knowledgeSchema.userId.safeParse(data)
    idType = (data: unknown) => this.knowledgeSchema.idType.safeParse(data)
    idName = (data: unknown) => this.knowledgeSchema.idName.safeParse(data)
    idPriority = (data: unknown) => this.knowledgeSchema.idPriority.safeParse(data)
    idDescription = (data: unknown) => this.knowledgeSchema.idDescription.safeParse(data)
}