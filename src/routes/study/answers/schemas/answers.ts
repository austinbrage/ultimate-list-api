import { z } from 'zod'

export const researchAnswersTableSchema = z.object({
    id: z.number({
        required_error: 'Research answer id is required',
        invalid_type_error: 'Research answer id must be a number'
    }),
    question_id: z.number({
        required_error: 'Question id is required',
        invalid_type_error: 'Question id must be a number'
    }),
    priority: z.number({
        required_error: 'Research answer priority is required',
        invalid_type_error: 'Research answer priority must be a number'
    }),
    type: z.string({
        required_error: 'Research answer type is required',
        invalid_type_error: 'Research answer type must be a string'
    }),
    name: z.string({
        required_error: 'Research answer name is required',
        invalid_type_error: 'Research answer name must be a string'
    }),
    description: z.string({
        required_error: 'Research answer description is required',
        invalid_type_error: 'Research answer description must be a string'
    }),
})

const id = researchAnswersTableSchema.pick({ id: true })
const questionId = researchAnswersTableSchema.pick({ question_id: true })
const idType = researchAnswersTableSchema.pick({ id: true, type: true })
const idName = researchAnswersTableSchema.pick({ question_id: true, id: true, name: true })
const idPriority = researchAnswersTableSchema.pick({ id: true, priority: true })
const questionIdName = researchAnswersTableSchema.pick({ question_id: true, name: true })
const idDescription = researchAnswersTableSchema.pick({ id: true, description: true })
const fullData = researchAnswersTableSchema.omit({ id: true })
const data = researchAnswersTableSchema.omit({ id: true, priority: true })

export const answerSchema = {
    id,
    questionId,
    idType,
    idName,
    idPriority,
    questionIdName,
    idDescription,
    fullData,
    data
}

const researchAnswersQuerySchema = z.object({
    question_id: z.string({
        required_error: 'Question id is required',
        invalid_type_error: 'Question id must be a string'
    })
}) 

const questionIdQuery = researchAnswersQuerySchema.pick({ question_id: true })

export const answerQuerySchema = {
    questionIdQuery
}