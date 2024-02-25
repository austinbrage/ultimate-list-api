import { conceptSchema, conceptQuerySchema } from '../schemas/concepts'
import { type ConceptTypes } from '../types/concepts'
import { type SafeParseReturnType } from 'zod'

export interface IConceptsValidation {
    id(data: unknown): SafeParseReturnType<unknown, ConceptTypes['id']> 
    knowledgeId(data: unknown): SafeParseReturnType<unknown, ConceptTypes['knowledgeId']> 
    idType(data: unknown): SafeParseReturnType<unknown, ConceptTypes['idType']> 
    idName(data: unknown): SafeParseReturnType<unknown, ConceptTypes['idName']> 
    fullData(data: unknown): SafeParseReturnType<unknown, ConceptTypes['fullData']> 
    idPriority(data: unknown): SafeParseReturnType<unknown, ConceptTypes['idPriority']> 
    idDescription(data: unknown): SafeParseReturnType<unknown, ConceptTypes['idDescription']> 
    knowledgeIdQuery(data: unknown): SafeParseReturnType<unknown, ConceptTypes['knowledgeIdQuery']>
}

export class ConceptsValidation implements IConceptsValidation {
    private conceptSchema: typeof conceptSchema
    private conceptQuerySchema: typeof conceptQuerySchema

    constructor() {
        this.conceptSchema = conceptSchema
        this.conceptQuerySchema = conceptQuerySchema
    }

    id = (data: unknown) => this.conceptSchema.id.safeParse(data)
    knowledgeId = (data: unknown) => this.conceptSchema.knowledgeId.safeParse(data)
    idType = (data: unknown) => this.conceptSchema.idType.safeParse(data)
    idName = (data: unknown) => this.conceptSchema.idName.safeParse(data)
    fullData = (data: unknown) => this.conceptSchema.fullData.safeParse(data)
    idPriority = (data: unknown) => this.conceptSchema.idPriority.safeParse(data)
    idDescription = (data: unknown) => this.conceptSchema.idDescription.safeParse(data)
    knowledgeIdQuery = (data: unknown) => this.conceptQuerySchema.knowledgeIdQuery.safeParse(data)
}