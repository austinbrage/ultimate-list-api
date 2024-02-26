import { asyncErrorHandler } from '../services/errorHandler'
import { createOkResponse, createErrorResponse } from '../helpers/appResponse'
import { ResearchValidation, type IResearchValidation } from '../validations/Researchs' 
import type { Request, Response, NextFunction } from 'express'
import type { ResearchController } from '../types/researchs'
import type { IResearch } from '../types/researchs' 
import type { ZodError } from 'zod'

export class Researchs implements ResearchController {
    private researchModel: IResearch
    private validateResearch: IResearchValidation

    constructor({ researchModel }: { researchModel: IResearch }) {
        this.researchModel = researchModel
        this.validateResearch = new ResearchValidation()
    }

    private validationErr(res: Response, validationError: ZodError<unknown>) {
        return res.status(400).json(createErrorResponse({
            message: 'Validation data error',
            error: validationError.format()
        }))
    } 

    getAll = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { user_id } = req.query 
        const validation = this.validateResearch.userId({ user_id: req?.userId.id })

        if(!validation.success) {
            return res.status(400).json(createErrorResponse({
                message: 'Could not get id from token, please login again'
            })) 
        }

        const result = await this.researchModel.getAll(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research from user requested',
            data: result
        }))
    })    

    changePriority = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, priority } = req.body
        const validation = this.validateResearch.idPriority(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.researchModel.changePriority(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research priority changed successfully'
        }))
    })

    changeType = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, type } = req.body
        const validation = this.validateResearch.idType(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.researchModel.changeType(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research type changed successfully'
        }))
    })

    changeName = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, name } = req.body
        const validation = this.validateResearch.idName(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        const result = await this.researchModel.getName({ 
            user_id: req?.userId.id,  
            name: validation.data.name
        })

        if(result.length !== 0) {
            return res.status(401).json(createErrorResponse({
                message: 'Existing research name'
            }))
        }

        await this.researchModel.changeName(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research name changed successfully'
        }))
    })

    changeDescription = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, description } = req.body
        const validation = this.validateResearch.idDescription(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.researchModel.changeDescription(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research description changed successfully'
        }))
    })

    addNew = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { user_id, type, name, priority, description } = req.body
        const validation = this.validateResearch.fullData({ user_id: req?.userId.id, ...req.body})

        if(!validation.success) return this.validationErr(res, validation.error)

        const result = await this.researchModel.getName({ 
            user_id: req?.userId.id,  
            name: validation.data.name
        })

        if(result.length !== 0) {
            return res.status(401).json(createErrorResponse({
                message: 'Existing research name'
            }))
        }

        await this.researchModel.addNew(validation.data)

        return res.status(201).json(createOkResponse({
            message: 'New research created successfully'
        }))
    })

    remove = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id } = req.body
        const validation = this.validateResearch.id(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.researchModel.remove(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research removed successfully'
        }))
    })
}