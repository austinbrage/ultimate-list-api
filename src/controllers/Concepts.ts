import { asyncErrorHandler } from '../services/errorHandler'
import { createOkResponse, createErrorResponse } from '../helpers/appResponse'
import { ConceptsValidation, type IConceptsValidation } from '../validations/Concepts' 
import type { Request, Response, NextFunction } from 'express'
import type { ConceptController } from '../types/concepts'
import type { IConcept } from '../types/concepts' 
import type { ZodError } from 'zod'

export class Concepts implements ConceptController {
    private conceptModel: IConcept
    private validateConcept: IConceptsValidation

    constructor({ conceptModel }: { conceptModel: IConcept }) {
        this.conceptModel = conceptModel
        this.validateConcept = new ConceptsValidation()
    }

    private validationErr(res: Response, validationError: ZodError<unknown>) {
        return res.status(400).json(createErrorResponse({
            message: 'Validation data error',
            error: validationError.format()
        }))
    } 

    getAll = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { knowledge_id } = req.query 
        const validation = this.validateConcept.knowledgeIdQuery(req.query)

        if(!validation.success) return this.validationErr(res, validation.error)

        const knowledge_id = +validation.data.knowledge_id

        if(isNaN(knowledge_id)) {
            return res.status(400).json(createErrorResponse({
                message: 'Could not transform knowledge id into a number'
            }))
        }

        const result = await this.conceptModel.getAll({ knowledge_id })

        return res.status(200).json(createOkResponse({
            message: 'Knowledge-concept from knowledge card requested',
            data: result
        }))
    })    

    changePriority = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, priority } = req.body
        const validation = this.validateConcept.idPriority(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.conceptModel.changePriority(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Knowledge-concept priority changed successfully'
        }))
    })

    changeType = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, type } = req.body
        const validation = this.validateConcept.idType(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.conceptModel.changeType(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Knowledge-concept type changed successfully'
        }))
    })

    changeName = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { knowledge_id, id, name } = req.body
        const validation = this.validateConcept.idName(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        const result = await this.conceptModel.getName({ 
            knowledge_id: validation.data.knowledge_id,  
            name: validation.data.name
        })

        if(result.length !== 0) {
            return res.status(401).json(createErrorResponse({
                message: 'Existing knowledge-concept name'
            }))
        }

        await this.conceptModel.changeName(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Knowledge-concept name changed successfully'
        }))
    })

    changeDescription = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, description } = req.body
        const validation = this.validateConcept.idDescription(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.conceptModel.changeDescription(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Knowledge-concept description changed successfully'
        }))
    })

    addNew = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { knowledge_id, type, name, priority, description } = req.body
        const validation = this.validateConcept.fullData(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.conceptModel.addNew(validation.data)

        return res.status(201).json(createOkResponse({
            message: 'New knowledge-concept created successfully'
        }))
    })

    remove = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id } = req.body
        const validation = this.validateConcept.id(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.conceptModel.remove(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Knowledge-concept removed successfully'
        }))
    })
}