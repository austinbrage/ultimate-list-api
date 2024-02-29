import { researchSchema } from '../schemas/researchs'
import { type ResearchTypes } from '../types/researchs'
import { type SafeParseReturnType } from 'zod'

export interface IResearchValidation {
    id(data: unknown): SafeParseReturnType<unknown, ResearchTypes['id']> 
    data(data: unknown): SafeParseReturnType<unknown, ResearchTypes['data']> 
    userId(data: unknown): SafeParseReturnType<unknown, ResearchTypes['userId']> 
    idType(data: unknown): SafeParseReturnType<unknown, ResearchTypes['idType']> 
    idName(data: unknown): SafeParseReturnType<unknown, ResearchTypes['idName']> 
    fullData(data: unknown): SafeParseReturnType<unknown, ResearchTypes['fullData']> 
    idPriority(data: unknown): SafeParseReturnType<unknown, ResearchTypes['idPriority']> 
    idDescription(data: unknown): SafeParseReturnType<unknown, ResearchTypes['idDescription']> 
}

export class ResearchValidation implements IResearchValidation {
    private researchSchema: typeof researchSchema

    constructor() {
        this.researchSchema = researchSchema
    }

    id = (data: unknown) => this.researchSchema.id.safeParse(data)
    data = (data: unknown) => this.researchSchema.data.safeParse(data)
    userId = (data: unknown) => this.researchSchema.userId.safeParse(data)
    idType = (data: unknown) => this.researchSchema.idType.safeParse(data)
    idName = (data: unknown) => this.researchSchema.idName.safeParse(data)
    fullData = (data: unknown) => this.researchSchema.fullData.safeParse(data)
    idPriority = (data: unknown) => this.researchSchema.idPriority.safeParse(data)
    idDescription = (data: unknown) => this.researchSchema.idDescription.safeParse(data)
}