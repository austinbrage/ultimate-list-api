import { asyncErrorHandler } from '../../../../services/errorHandler'
import { createOkResponse, createErrorResponse } from '../../../../helpers/appResponse'
import { AnswersValidation, type IAnswersValidation } from '../validations/Answers' 
import type { Request, Response, NextFunction } from 'express'
import type { AnswerController } from '../types/answers'
import type { IAnswer } from '../types/answers' 
import type { ZodError } from 'zod'

export class Answers implements AnswerController {
    private answerModel: IAnswer
    private validateAnswer: IAnswersValidation

    constructor({ answerModel }: { answerModel: IAnswer }) {
        this.answerModel = answerModel
        this.validateAnswer = new AnswersValidation()
    }

    private validationErr(res: Response, validationError: ZodError<unknown>) {
        return res.status(400).json(createErrorResponse({
            message: 'Validation data error',
            error: validationError.format()
        }))
    } 

    getAll = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { question_id } = req.query 
        const validation = this.validateAnswer.questionIdQuery(req.query)

        if(!validation.success) return this.validationErr(res, validation.error)

        const question_id = +validation.data.question_id

        if(isNaN(question_id)) {
            return res.status(400).json(createErrorResponse({
                message: 'Could not transform question id into a number'
            }))
        }

        const result = await this.answerModel.getAll({ question_id })

        return res.status(200).json(createOkResponse({
            message: 'Research answer from question requested',
            data: result
        }))
    })    

    changePriority = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, priority } = req.body
        const validation = this.validateAnswer.idPriority(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.answerModel.changePriority(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research answer priority changed successfully'
        }))
    })

    changeType = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, type } = req.body
        const validation = this.validateAnswer.idType(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.answerModel.changeType(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research answer type changed successfully'
        }))
    })

    changeName = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { question_id, id, name } = req.body
        const validation = this.validateAnswer.idName(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        const result = await this.answerModel.getName({ 
            question_id: validation.data.question_id,  
            name: validation.data.name
        })

        if(result.length !== 0) {
            return res.status(401).json(createErrorResponse({
                message: 'Existing research answer name'
            }))
        }

        await this.answerModel.changeName(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research answer name changed successfully'
        }))
    })

    changeDescription = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, description } = req.body
        const validation = this.validateAnswer.idDescription(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.answerModel.changeDescription(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research answer description changed successfully'
        }))
    })

    addNew = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { question_id, type, name, description } = req.body
        const validation = this.validateAnswer.data(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        const result = await this.answerModel.getName({ 
            question_id: validation.data.question_id,  
            name: validation.data.name
        })

        if(result.length !== 0) {
            return res.status(401).json(createErrorResponse({
                message: 'Existing Research answer name'
            }))
        }

        const resultPriority = await this.answerModel.getPriority({
            question_id: validation.data.question_id
        })

        const newPriority = resultPriority[0]?.priority + 1 ?? 1

        await this.answerModel.addNew({...validation.data, priority: newPriority})

        return res.status(201).json(createOkResponse({
            message: 'New research answer created successfully'
        }))
    })

    remove = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id } = req.body
        const validation = this.validateAnswer.id(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.answerModel.remove(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research answer removed successfully'
        }))
    })
}