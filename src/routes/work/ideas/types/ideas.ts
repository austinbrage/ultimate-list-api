import { z } from 'zod'
import { ideaSchema } from "../schemas/ideas"
import { type RowDataPacket, type ResultSetHeader } from 'mysql2'
import { type AsyncFunction } from '../../../../services/errorHandler'

export type IdeaTypes = {
    id: z.infer<typeof ideaSchema.id>
    userId: z.infer<typeof ideaSchema.userId>
    idType: z.infer<typeof ideaSchema.idType>
    idName: z.infer<typeof ideaSchema.idName>
    idPriority: z.infer<typeof ideaSchema.idPriority>
    userIdName: z.infer<typeof ideaSchema.userIdName>
    idDescription: z.infer<typeof ideaSchema.idDescription>
    idSolvedProblem: z.infer<typeof ideaSchema.idSolvedProblem>
    fullData: z.infer<typeof ideaSchema.fullData>
    data: z.infer<typeof ideaSchema.data>
}

export interface IIdea {
    getAll({ user_id }: IdeaTypes['userId']): Promise<RowDataPacket[]>
    getName({ user_id, name }: IdeaTypes['userIdName']): Promise<RowDataPacket[]>
    getPriority({ user_id }: IdeaTypes['userId']): Promise<RowDataPacket[]>
    changePriority({ id, priority }: IdeaTypes['idPriority']): Promise<ResultSetHeader>
    changeType({ id, type }: IdeaTypes['idType']): Promise<ResultSetHeader>
    changeName({ id, name }: IdeaTypes['idName']): Promise<ResultSetHeader>
    changeDescription({ id, description }: IdeaTypes['idDescription']): Promise<ResultSetHeader>
    changeSolvedProblem({ id, solved_problem }: IdeaTypes['idSolvedProblem']): Promise<ResultSetHeader>
    addNew({ user_id, type, name, priority, description, solved_problem }: IdeaTypes['fullData']): Promise<ResultSetHeader>
    remove({ id }: IdeaTypes['id']): Promise<ResultSetHeader>
}

export interface IdeaController {
    getAll: AsyncFunction    
    changePriority: AsyncFunction
    changeType: AsyncFunction
    changeName: AsyncFunction
    changeDescription: AsyncFunction
    changeSolvedProblem: AsyncFunction
    addNew: AsyncFunction
    remove: AsyncFunction
}