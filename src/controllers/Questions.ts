import { asyncErrorHandler } from '../services/errorHandler'
import { createOkResponse, createErrorResponse } from '../helpers/appResponse'
import { QuestionValidation, type IQuestionValidation } from '../validations/Questions'
import type { Request, Response, NextFunction } from 'express'
import type { QuestionController } from '../types/questions'
import type { IQuestion } from '../types/questions' 
import type { ZodError } from 'zod'

export class Questions implements QuestionController {
    private questionModel: IQuestion
    private validateQuestion: IQuestionValidation

    constructor({ questionModel }: { questionModel: IQuestion }) {
        this.questionModel = questionModel
        this.validateQuestion = new QuestionValidation()
    }

    private validationErr(res: Response, validationError: ZodError<unknown>) {
        return res.status(400).json(createErrorResponse({
            message: 'Validation data error',
            error: validationError.format()
        }))
    } 

    getAll = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { research_id } = req.query 
        const validation = this.validateQuestion.researchIdQuery(req.query)

        if(!validation.success) return this.validationErr(res, validation.error)
        
        const research_id = +validation.data.research_id

        if(isNaN(research_id)) {
            return res.status(400).json(createErrorResponse({
                message: 'Could not transform research id into a number'
            }))
        }

        const result = await this.questionModel.getAll({ research_id })

        return res.status(200).json(createOkResponse({
            message: 'Research question from user requested',
            data: result
        }))
    })    

    changeName = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, name } = req.body 
        const validation = this.validateQuestion.idName(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        const result = await this.questionModel.changeName(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research question name changed successfully',
            data: result
        }))
    })    

    changePriority = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, priority } = req.body 
        const validation = this.validateQuestion.idPriority(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        const result = await this.questionModel.changePriority(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research question priority changed successfully',
            data: result
        }))
    })    

    changeDescription = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, description } = req.body
        const validation = this.validateQuestion.idDescription(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        const result = await this.questionModel.changeDescription(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research question description changed successfully',
            data: result
        }))
    })    

    addNew = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { research_id, name, priority, description } = req.body
        const validation = this.validateQuestion.fullData(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        const result = await this.questionModel.addNew(validation.data)

        return res.status(201).json(createOkResponse({
            message: 'New research question created successfully',
            data: result
        }))
    })    

    remove = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id } = req.body
        const validation = this.validateQuestion.id(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        const result = await this.questionModel.remove(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research question removed successfully',
            data: result
        }))
    })    
}