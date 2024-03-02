import { ideaSchema } from '../schemas/ideas'
import { type IdeaTypes } from '../types/ideas'
import { type SafeParseReturnType } from 'zod'

export interface IIdeaValidation {
    id(data: unknown): SafeParseReturnType<unknown, IdeaTypes['id']> 
    data(data: unknown): SafeParseReturnType<unknown, IdeaTypes['data']> 
    userId(data: unknown): SafeParseReturnType<unknown, IdeaTypes['userId']> 
    idType(data: unknown): SafeParseReturnType<unknown, IdeaTypes['idType']> 
    idName(data: unknown): SafeParseReturnType<unknown, IdeaTypes['idName']> 
    fullData(data: unknown): SafeParseReturnType<unknown, IdeaTypes['fullData']> 
    idPriority(data: unknown): SafeParseReturnType<unknown, IdeaTypes['idPriority']> 
    idDescription(data: unknown): SafeParseReturnType<unknown, IdeaTypes['idDescription']> 
    idSolvedProblem(data: unknown): SafeParseReturnType<unknown, IdeaTypes['idSolvedProblem']> 
}

export class IdeaValidation implements IIdeaValidation {
    private ideaSchema: typeof ideaSchema

    constructor() {
        this.ideaSchema = ideaSchema
    }

    id = (data: unknown) => this.ideaSchema.id.safeParse(data)
    data = (data: unknown) => this.ideaSchema.data.safeParse(data)
    userId = (data: unknown) => this.ideaSchema.userId.safeParse(data)
    idType = (data: unknown) => this.ideaSchema.idType.safeParse(data)
    idName = (data: unknown) => this.ideaSchema.idName.safeParse(data)
    fullData = (data: unknown) => this.ideaSchema.fullData.safeParse(data)
    idPriority = (data: unknown) => this.ideaSchema.idPriority.safeParse(data)
    idDescription = (data: unknown) => this.ideaSchema.idDescription.safeParse(data)
    idSolvedProblem = (data: unknown) => this.ideaSchema.idSolvedProblem.safeParse(data)
}