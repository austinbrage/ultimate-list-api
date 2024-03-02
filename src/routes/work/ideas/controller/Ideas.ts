import { asyncErrorHandler } from '../../../../services/errorHandler'
import { createOkResponse, createErrorResponse } from '../../../../helpers/appResponse'
import { IdeaValidation, type IIdeaValidation } from '../validations/Ideas' 
import type { Request, Response, NextFunction } from 'express'
import type { IdeaController } from '../types/ideas'
import type { IIdea } from '../types/ideas' 
import type { ZodError } from 'zod'

export class Ideas implements IdeaController {
    private ideaModel: IIdea
    private validateIdea: IIdeaValidation

    constructor({ ideaModel }: { ideaModel: IIdea }) {
        this.ideaModel = ideaModel
        this.validateIdea = new IdeaValidation()
    }

    private validationErr(res: Response, validationError: ZodError<unknown>) {
        return res.status(400).json(createErrorResponse({
            message: 'Validation data error',
            error: validationError.format()
        }))
    } 

    getAll = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { user_id } = req.query 
        const validation = this.validateIdea.userId({ user_id: req?.userId.id })

        if(!validation.success) {
            return res.status(400).json(createErrorResponse({
                message: 'Could not get id from token, please login again'
            })) 
        }

        const result = await this.ideaModel.getAll(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Idea from user requested',
            data: result
        }))
    })    

    changePriority = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, priority } = req.body
        const validation = this.validateIdea.idPriority(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.ideaModel.changePriority(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Idea priority changed successfully'
        }))
    })

    changeType = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, type } = req.body
        const validation = this.validateIdea.idType(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.ideaModel.changeType(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Idea type changed successfully'
        }))
    })

    changeName = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, name } = req.body
        const validation = this.validateIdea.idName(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        const result = await this.ideaModel.getName({ 
            user_id: req?.userId.id,  
            name: validation.data.name
        })

        if(result.length !== 0) {
            return res.status(401).json(createErrorResponse({
                message: 'Existing idea name'
            }))
        }

        await this.ideaModel.changeName(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Idea name changed successfully'
        }))
    })

    changeDescription = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, description } = req.body
        const validation = this.validateIdea.idDescription(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.ideaModel.changeDescription(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Idea description changed successfully'
        }))
    })

    changeSolvedProblem = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, solved_problem } = req.body
        const validation = this.validateIdea.idSolvedProblem(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.ideaModel.changeSolvedProblem(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Idea description changed successfully'
        }))
    })

    addNew = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { user_id, type, name, description, solved_problem } = req.body
        const validation = this.validateIdea.data({ user_id: req?.userId.id, ...req.body})

        if(!validation.success) return this.validationErr(res, validation.error)

        const result = await this.ideaModel.getName({ 
            user_id: req?.userId.id,  
            name: validation.data.name
        })

        if(result.length !== 0) {
            return res.status(401).json(createErrorResponse({
                message: 'Existing idea name'
            }))
        }

        const resultPriority = await this.ideaModel.getPriority({
            user_id: validation.data.user_id
        })

        const newPriority = resultPriority[0]?.priority + 1 ?? 1

        await this.ideaModel.addNew({...validation.data, priority: newPriority})

        return res.status(201).json(createOkResponse({
            message: 'New idea created successfully'
        }))
    })

    remove = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id } = req.body
        const validation = this.validateIdea.id(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.ideaModel.remove(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Idea removed successfully'
        }))
    })
}