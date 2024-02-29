import { asyncErrorHandler } from '../../../services/errorHandler'
import { createOkResponse, createErrorResponse } from '../../../helpers/appResponse'
import { KnowledgeValidation, type IKnowledgeValidation } from '../validations/Knowledge' 
import type { Request, Response, NextFunction } from 'express'
import type { KnowledgeController } from '../types/knowledge'
import type { IKnowledge } from '../types/knowledge' 
import type { ZodError } from 'zod'

export class Knowledge implements KnowledgeController {
    private knowledgeModel: IKnowledge
    private validateKnowledge: IKnowledgeValidation

    constructor({ knowledgeModel }: { knowledgeModel: IKnowledge }) {
        this.knowledgeModel = knowledgeModel
        this.validateKnowledge = new KnowledgeValidation()
    }

    private validationErr(res: Response, validationError: ZodError<unknown>) {
        return res.status(400).json(createErrorResponse({
            message: 'Validation data error',
            error: validationError.format()
        }))
    } 

    getAll = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { user_id } = req.query 
        const validation = this.validateKnowledge.userId({ user_id: req?.userId.id })

        if(!validation.success) {
            return res.status(400).json(createErrorResponse({
                message: 'Could not get id from token, please login again'
            })) 
        }

        const result = await this.knowledgeModel.getAll(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Knowledge from user requested',
            data: result
        }))
    })    

    changePriority = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, priority } = req.body
        const validation = this.validateKnowledge.idPriority(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.knowledgeModel.changePriority(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Knowledge priority changed successfully'
        }))
    })

    changeType = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, type } = req.body
        const validation = this.validateKnowledge.idType(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.knowledgeModel.changeType(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Knowledge type changed successfully'
        }))
    })

    changeName = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, name } = req.body
        const validation = this.validateKnowledge.idName(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        const result = await this.knowledgeModel.getName({ 
            user_id: req?.userId.id,  
            name: validation.data.name
        })

        if(result.length !== 0) {
            return res.status(401).json(createErrorResponse({
                message: 'Existing knowledge name'
            }))
        }

        await this.knowledgeModel.changeName(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Knowledge name changed successfully'
        }))
    })

    changeDescription = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, description } = req.body
        const validation = this.validateKnowledge.idDescription(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.knowledgeModel.changeDescription(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Knowledge description changed successfully'
        }))
    })

    addNew = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { user_id, type, name, description } = req.body
        const validation = this.validateKnowledge.data({ user_id: req?.userId.id, ...req.body})

        if(!validation.success) return this.validationErr(res, validation.error)

        const result = await this.knowledgeModel.getName({ 
            user_id: req?.userId.id,  
            name: validation.data.name
        })

        if(result.length !== 0) {
            return res.status(401).json(createErrorResponse({
                message: 'Existing knowledge name'
            }))
        }

        const resultPriority = await this.knowledgeModel.getPriority({
            user_id: req?.userId.id
        })

        const newPriority = resultPriority[0]?.priority + 1 ?? 1
        
        await this.knowledgeModel.addNew({...validation.data, priority: newPriority})

        return res.status(201).json(createOkResponse({
            message: 'New knowledge created successfully'
        }))
    })

    remove = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id } = req.body
        const validation = this.validateKnowledge.id(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.knowledgeModel.remove(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Knowledge removed successfully'
        }))
    })
}