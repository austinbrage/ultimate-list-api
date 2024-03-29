import { asyncErrorHandler } from '../../../../services/errorHandler'
import { createOkResponse, createErrorResponse } from '../../../../helpers/appResponse'
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
        // const { research_id, id, name } = req.body 
        const validation = this.validateQuestion.idName(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        const result = await this.questionModel.getName({ 
            research_id: validation.data.research_id,  
            name: validation.data.name
        })

        if(result.length !== 0) {
            return res.status(401).json(createErrorResponse({
                message: 'Existing research question name'
            }))
        }

        await this.questionModel.changeName(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research question name changed successfully'
        }))
    })    

    changePriority = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, priority } = req.body 
        const validation = this.validateQuestion.idPriority(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.questionModel.changePriority(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research question priority changed successfully'
        }))
    })    

    changeDescription = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id, description } = req.body
        const validation = this.validateQuestion.idDescription(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

         await this.questionModel.changeDescription(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research question description changed successfully'
        }))
    })    

    addNew = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { research_id, name, description } = req.body
        const validation = this.validateQuestion.data(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        const resultName = await this.questionModel.getName({ 
            research_id: validation.data.research_id,  
            name: validation.data.name
        })

        if(resultName.length !== 0) {
            return res.status(401).json(createErrorResponse({
                message: 'Existing research question name'
            }))
        }

        const resultPriority = await this.questionModel.getPriority({
            research_id: validation.data.research_id
        })

        const newPriority = resultPriority[0]?.priority + 1 ?? 1

        await this.questionModel.addNew({...validation.data, priority: newPriority})

        return res.status(201).json(createOkResponse({
            message: 'New research question created successfully'
        }))
    })    

    remove = asyncErrorHandler(async (req: Request, res: Response) => {
        // const { id } = req.body
        const validation = this.validateQuestion.id(req.body)

        if(!validation.success) return this.validationErr(res, validation.error)

        await this.questionModel.remove(validation.data)

        return res.status(200).json(createOkResponse({
            message: 'Research question removed successfully'
        }))
    })    
}